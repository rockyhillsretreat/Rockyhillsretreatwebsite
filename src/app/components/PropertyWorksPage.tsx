import { useEffect, useState } from "react";

const BASE_ID = "appO2vRe5CUCeHFYg";
const TABLE_ID = "tblZXYKCsFt813W70";
const PAT = import.meta.env.VITE_AIRTABLE_PAT;

const F = {
  task:      "fldvtNVuZPJVVsbpK",
  category:  "fldsQUUG3cfyPYJ7t",
  assignee:  "fld2PU6M2DaaPGd22",
  status:    "fldaw8Uz5BuUG4xuc",
  priority:  "fld3BsBqsEsWOg8VB",
  notes:     "fldyYFl8djaDfylrz",
  contact:   "fldcoWlaBEEnc1eIa",
  estimated: "fldlYXp6yQEazEDXe",
  actual:    "fldEynxDbSZ4i3MTA",
  invoice:   "fldt9cWIZ4vcC7Qsy",
  completed: "fldghVWn1U2R8PocW",
};

type Record = { id: string; fields: { [key: string]: any } };

function val(r: Record, key: keyof typeof F): string {
  const v = r.fields?.[F[key]];
  if (v === undefined || v === null) return "";
  if (typeof v === "object" && "name" in v) return v.name;
  return String(v);
}

async function fetchAllRecords(): Promise<Record[]> {
  let all: Record[] = [];
  let offset = "";
  do {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100${offset ? `&offset=${offset}` : ""}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${PAT}` } });
    if (!res.ok) throw new Error(`Airtable error ${res.status}`);
    const data = await res.json();
    all = all.concat(data.records || []);
    offset = data.offset || "";
  } while (offset);
  return all;
}

async function patchRecord(id: string, fields: object): Promise<Record> {
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error(`Save error ${res.status}`);
  return res.json();
}

const PRIORITY_ORDER: { [k: string]: number } = { High: 0, Medium: 1, Low: 2 };
const PERSON_ORDER = ["Curtis","Jeremy","Todd (electrician)","Water Tank Cleaning Tas","Mode Energy","Courtenay","TBC"];
const ASSIGNEES = ["Curtis","Jeremy","Todd (electrician)","Water Tank Cleaning Tas","Mode Energy","Courtenay","TBC"];

export default function PropertyWorksPage() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"tasks"|"budget">("tasks");
  const [filterAssignee, setFilterAssignee] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("active");
  const [panel, setPanel] = useState<Record | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    fetchAllRecords()
      .then(setRecords)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = records.filter(r => {
    if (filterAssignee !== "all" && val(r, "assignee") !== filterAssignee) return false;
    if (filterCategory !== "all" && val(r, "category") !== filterCategory) return false;
    const s = val(r, "status");
    if (filterStatus === "active" && s === "Done") return false;
    if (filterStatus === "done" && s !== "Done") return false;
    return true;
  });

  const assignees = [...new Set(records.map(r => val(r, "assignee")).filter(Boolean))];
  const categories = [...new Set(records.map(r => val(r, "category")).filter(Boolean))].sort();

  const grouped: { [k: string]: Record[] } = {};
  filtered.forEach(r => {
    const a = val(r, "assignee") || "Unassigned";
    if (!grouped[a]) grouped[a] = [];
    grouped[a].push(r);
  });
  Object.keys(grouped).forEach(a =>
    grouped[a].sort((x, y) => (PRIORITY_ORDER[val(x,"priority")]??9) - (PRIORITY_ORDER[val(y,"priority")]??9))
  );
  const sortedGroups = Object.keys(grouped).sort((a, b) => {
    const ai = PERSON_ORDER.indexOf(a); const bi = PERSON_ORDER.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  function openPanel(r: Record) {
    setPanel(r);
    setForm({
      status:    val(r, "status") || "Not started",
      priority:  val(r, "priority") || "Medium",
      assignee:  val(r, "assignee") || "TBC",
      notes:     val(r, "notes"),
      contact:   val(r, "contact"),
      estimated: val(r, "estimated"),
      actual:    val(r, "actual"),
      invoice:   val(r, "invoice"),
      completed: val(r, "completed"),
    });
  }

  async function savePanel() {
    if (!panel) return;
    setSaving(true);
    try {
      const fields: { [k: string]: any } = {
        [F.status]:    form.status,
        [F.priority]:  form.priority,
        [F.assignee]:  form.assignee,
        [F.notes]:     form.notes,
        [F.contact]:   form.contact,
        [F.invoice]:   form.invoice,
        [F.completed]: form.completed || null,
      };
      if (form.estimated !== "") fields[F.estimated] = Number(form.estimated);
      if (form.actual !== "")    fields[F.actual]    = Number(form.actual);
      const updated = await patchRecord(panel.id, fields);
      setRecords(rs => rs.map(r => r.id === panel.id ? updated : r));
      setPanel(null);
    } catch(e: any) { alert("Could not save: " + e.message); }
    finally { setSaving(false); }
  }

  async function quickDone(id: string, newStatus: string) {
    const fields: { [k: string]: any } = { [F.status]: newStatus };
    if (newStatus === "Done") fields[F.completed] = new Date().toISOString().split("T")[0];
    try {
      const updated = await patchRecord(id, fields);
      setRecords(rs => rs.map(r => r.id === id ? updated : r));
    } catch(e: any) { alert("Could not update."); }
  }

  // Budget calcs
  let totalEst = 0, totalAct = 0;
  const bycat: { [k: string]: { est: number; act: number; count: number } } = {};
  records.forEach(r => {
    const cat = val(r,"category") || "Uncategorised";
    const est = Number(val(r,"estimated")) || 0;
    const act = Number(val(r,"actual")) || 0;
    totalEst += est; totalAct += act;
    if (!bycat[cat]) bycat[cat] = { est:0, act:0, count:0 };
    bycat[cat].est += est; bycat[cat].act += act; bycat[cat].count++;
  });
  const doneCount = records.filter(r => val(r,"status") === "Done").length;
  const variance = totalAct - totalEst;

  const s: { [k: string]: any } = {
    page: { minHeight: "100vh", background: "#f5f4f0", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#1a1a1a" },
    header: { background: "#26333A", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky" as const, top: 0, zIndex: 100 },
    h1: { color: "#EDE9E3", fontSize: 15, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" as const, margin: 0 },
    sub: { color: "#8FA9B3", fontSize: 12, marginTop: 2 },
    badge: { fontSize: 11, background: "rgba(143,169,179,0.15)", color: "#8FA9B3", border: "1px solid rgba(143,169,179,0.3)", borderRadius: 4, padding: "3px 8px" },
    nav: { background: "#fff", borderBottom: "1px solid #e5e3de", display: "flex", padding: "0 1.5rem" },
    navTab: (active: boolean) => ({ padding: "0.85rem 1.25rem", fontSize: 13, fontWeight: 500, color: active ? "#26333A" : "#888", cursor: "pointer", borderBottom: active ? "2px solid #8FA9B3" : "2px solid transparent", background: "none", border: "none", borderBottomStyle: "solid" as const, borderBottomWidth: active ? 2 : 2, borderBottomColor: active ? "#8FA9B3" : "transparent" }),
    main: { padding: "1.5rem", maxWidth: 1100, margin: "0 auto" },
    filterBar: { display: "flex", gap: 8, flexWrap: "wrap" as const, marginBottom: "1.25rem", alignItems: "center" },
    select: { fontSize: 13, padding: "6px 10px", border: "1px solid #ddd", borderRadius: 6, background: "#fff", color: "#1a1a1a", outline: "none" },
    sectionLabel: { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#888", padding: "0.75rem 0 0.25rem", display: "flex", alignItems: "center", gap: 8 },
    card: { background: "#fff", border: "1px solid #e5e3de", borderRadius: 10, padding: "1rem 1.25rem", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 },
    check: (done: boolean) => ({ width: 18, height: 18, borderRadius: "50%", border: done ? "2px solid #3B6D11" : "2px solid #ddd", background: done ? "#3B6D11" : "transparent", flexShrink: 0, marginTop: 2, cursor: "pointer" }),
    taskName: { fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 4, lineHeight: 1.4 },
    meta: { display: "flex", gap: 6, flexWrap: "wrap" as const, alignItems: "center" },
    priorityBadge: (p: string) => ({ fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 4, background: p==="High"?"#FCEBEB":p==="Medium"?"#FAEEDA":"#EAF3DE", color: p==="High"?"#A32D2D":p==="Medium"?"#854F0B":"#3B6D11" }),
    catBadge: { fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 4, background: "#f0ede8", color: "#555" },
    notePreview: { fontSize: 12, color: "#888", marginTop: 4, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis", maxWidth: 500 },
    contactText: { fontSize: 11, color: "#8FA9B3", marginTop: 4 },
    metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", gap: 12, marginBottom: "1.5rem" },
    metricCard: { background: "#fff", border: "1px solid #e5e3de", borderRadius: 10, padding: "1rem 1.25rem" },
    metricLabel: { fontSize: 12, color: "#888", marginBottom: 4 },
    metricValue: (over: boolean) => ({ fontSize: 22, fontWeight: 500, color: over ? "#A32D2D" : "#26333A" }),
    table: { background: "#fff", border: "1px solid #e5e3de", borderRadius: 10, overflow: "hidden" },
    th: { textAlign: "left" as const, padding: "10px 16px", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#888", background: "#faf9f7", borderBottom: "1px solid #e5e3de" },
    td: { padding: "10px 16px", borderBottom: "1px solid #f0ede8" },
    overlay: { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 200 },
    panelWrap: { position: "fixed" as const, top: 0, right: 0, width: "100%", maxWidth: 520, height: "100vh", background: "#fff", zIndex: 201, display: "flex", flexDirection: "column" as const, overflow: "hidden" },
    panelHeader: { background: "#26333A", padding: "1rem 1.25rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
    panelTitle: { color: "#EDE9E3", fontSize: 14, fontWeight: 500, lineHeight: 1.4 },
    panelClose: { background: "none", border: "none", color: "#8FA9B3", fontSize: 20, cursor: "pointer", padding: 0, lineHeight: 1 },
    panelBody: { flex: 1, overflowY: "auto" as const, padding: "1.25rem" },
    panelFooter: { padding: "1rem 1.25rem", borderTop: "1px solid #e5e3de", display: "flex", gap: 8 },
    fieldGroup: { marginBottom: "1.25rem" },
    fieldLabel: { fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "#888", marginBottom: 6, display: "block" },
    input: { width: "100%", fontSize: 14, padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8, background: "#fff", color: "#1a1a1a", outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const },
    textarea: { width: "100%", fontSize: 14, padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8, background: "#fff", color: "#1a1a1a", outline: "none", fontFamily: "inherit", minHeight: 100, lineHeight: 1.6, resize: "vertical" as const, boxSizing: "border-box" as const },
    fieldRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
    btn: { padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "1px solid #ddd", background: "#fff", color: "#1a1a1a", fontFamily: "inherit" },
    btnPrimary: { padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "1px solid #26333A", background: "#26333A", color: "#EDE9E3", fontFamily: "inherit", flex: 1 },
  };

  if (loading) return <div style={s.page}><div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>Loading tasks...</div></div>;
  if (error) return <div style={s.page}><div style={{ margin: "2rem", background: "#FCEBEB", color: "#A32D2D", border: "1px solid #F7C1C1", borderRadius: 8, padding: "12px 16px" }}>Error: {error}</div></div>;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.h1}>Rocky Hills Retreat</h1>
          <div style={s.sub}>Property works tracker</div>
        </div>
        <span style={s.badge}>{records.length} tasks</span>
      </div>

      <nav style={s.nav}>
        <button style={s.navTab(tab==="tasks")} onClick={() => setTab("tasks")}>Tasks</button>
        <button style={s.navTab(tab==="budget")} onClick={() => setTab("budget")}>Budget</button>
      </nav>

      <div style={s.main}>
        {tab === "tasks" && (
          <>
            <div style={s.filterBar}>
              <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>Filter:</span>
              <select style={s.select} value={filterAssignee} onChange={e => setFilterAssignee(e.target.value)}>
                <option value="all">All people</option>
                {assignees.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <select style={s.select} value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
                <option value="all">All categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select style={s.select} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="active">Active tasks</option>
                <option value="all">All tasks</option>
                <option value="done">Done only</option>
              </select>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "#888" }}>{filtered.length} tasks</span>
            </div>

            {sortedGroups.map(assignee => (
              <div key={assignee}>
                <div style={s.sectionLabel}>
                  <span>{assignee}</span>
                  <div style={{ flex: 1, height: 1, background: "#e5e3de" }} />
                </div>
                {grouped[assignee].map(r => {
                  const isDone = val(r,"status") === "Done";
                  const est = val(r,"estimated");
                  const act = val(r,"actual");
                  return (
                    <div key={r.id} style={{ ...s.card, opacity: isDone ? 0.55 : 1 }} onClick={() => openPanel(r)}>
                      <div
                        style={s.check(isDone)}
                        onClick={e => { e.stopPropagation(); quickDone(r.id, isDone ? "Not started" : "Done"); }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={s.taskName}>{val(r,"task")}</div>
                        <div style={s.meta}>
                          {val(r,"priority") && <span style={s.priorityBadge(val(r,"priority"))}>{val(r,"priority")}</span>}
                          {val(r,"category") && <span style={s.catBadge}>{val(r,"category")}</span>}
                          {val(r,"status") && val(r,"status") !== "Not started" && <span style={s.catBadge}>{val(r,"status")}</span>}
                        </div>
                        {val(r,"notes") && <div style={s.notePreview}>{val(r,"notes")}</div>}
                        {val(r,"contact") && <div style={s.contactText}>{val(r,"contact")}</div>}
                      </div>
                      {(act || est) && (
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#26333A", whiteSpace: "nowrap", textAlign: "right" }}>
                          <span style={{ fontSize: 11, color: "#888" }}>{act ? "actual" : "est."} </span>
                          ${Number(act || est).toLocaleString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </>
        )}

        {tab === "budget" && (
          <>
            <div style={s.metricGrid}>
              {[
                { label: "Total estimated", value: `$${Math.round(totalEst).toLocaleString()}`, over: false },
                { label: "Total spent", value: `$${Math.round(totalAct).toLocaleString()}`, over: totalAct > totalEst && totalEst > 0 },
                { label: "Tasks complete", value: `${doneCount} / ${records.length}`, over: false },
                { label: "Variance", value: `${variance >= 0 ? "+" : ""}$${Math.round(Math.abs(variance)).toLocaleString()}`, over: variance > 0 },
              ].map(m => (
                <div key={m.label} style={s.metricCard}>
                  <div style={s.metricLabel}>{m.label}</div>
                  <div style={s.metricValue(m.over)}>{m.value}</div>
                </div>
              ))}
            </div>
            <div style={s.table}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>{["Category","Tasks","Estimated","Actual","Variance"].map(h => <th key={h} style={{ ...s.th, textAlign: h==="Category"?"left":"right" }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {Object.keys(bycat).map(cat => {
                    const { est, act, count } = bycat[cat];
                    const v = act - est;
                    return (
                      <tr key={cat}>
                        <td style={s.td}><span style={s.catBadge}>{cat}</span></td>
                        <td style={{ ...s.td, textAlign: "right" }}>{count}</td>
                        <td style={{ ...s.td, textAlign: "right" }}>{est > 0 ? `$${Math.round(est).toLocaleString()}` : "—"}</td>
                        <td style={{ ...s.td, textAlign: "right" }}>{act > 0 ? `$${Math.round(act).toLocaleString()}` : "—"}</td>
                        <td style={{ ...s.td, textAlign: "right", color: v > 0 ? "#A32D2D" : v < 0 ? "#3B6D11" : "#1a1a1a" }}>
                          {est > 0 || act > 0 ? `${v >= 0 ? "+" : ""}$${Math.round(Math.abs(v)).toLocaleString()}` : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {panel && (
        <>
          <div style={s.overlay} onClick={() => setPanel(null)} />
          <div style={s.panelWrap}>
            <div style={s.panelHeader}>
              <div style={s.panelTitle}>{val(panel,"task")}</div>
              <button style={s.panelClose} onClick={() => setPanel(null)}>✕</button>
            </div>
            <div style={s.panelBody}>
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Status</label>
                <select style={s.input} value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
                  {["Not started","In progress","Waiting on response","Done"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={s.fieldRow}>
                <div style={s.fieldGroup}>
                  <label style={s.fieldLabel}>Priority</label>
                  <select style={s.input} value={form.priority} onChange={e => setForm(f => ({...f, priority: e.target.value}))}>
                    {["High","Medium","Low"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={s.fieldGroup}>
                  <label style={s.fieldLabel}>Assigned to</label>
                  <select style={s.input} value={form.assignee} onChange={e => setForm(f => ({...f, assignee: e.target.value}))}>
                    {ASSIGNEES.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Notes</label>
                <textarea style={s.textarea} value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} placeholder="Add notes, context, updates..." />
              </div>
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Contact / reference</label>
                <input style={s.input} value={form.contact} onChange={e => setForm(f => ({...f, contact: e.target.value}))} placeholder="e.g. 0438 428 695" />
              </div>
              <div style={s.fieldRow}>
                <div style={s.fieldGroup}>
                  <label style={s.fieldLabel}>Estimated cost ($)</label>
                  <input type="number" style={s.input} value={form.estimated} onChange={e => setForm(f => ({...f, estimated: e.target.value}))} placeholder="0" />
                </div>
                <div style={s.fieldGroup}>
                  <label style={s.fieldLabel}>Actual cost ($)</label>
                  <input type="number" style={s.input} value={form.actual} onChange={e => setForm(f => ({...f, actual: e.target.value}))} placeholder="0" />
                </div>
              </div>
              <div style={s.fieldRow}>
                <div style={s.fieldGroup}>
                  <label style={s.fieldLabel}>Quote / invoice #</label>
                  <input style={s.input} value={form.invoice} onChange={e => setForm(f => ({...f, invoice: e.target.value}))} placeholder="INV-001" />
                </div>
                <div style={s.fieldGroup}>
                  <label style={s.fieldLabel}>Date completed</label>
                  <input type="date" style={s.input} value={form.completed} onChange={e => setForm(f => ({...f, completed: e.target.value}))} />
                </div>
              </div>
            </div>
            <div style={s.panelFooter}>
              <button style={s.btn} onClick={() => setPanel(null)}>Cancel</button>
              <button style={s.btnPrimary} onClick={savePanel} disabled={saving}>{saving ? "Saving..." : "Save changes"}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
