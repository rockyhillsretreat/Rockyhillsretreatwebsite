import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const PROPERTY_ID = 'b607a4fc675641f4a6737795d38edc74';

const packages = [
  { id: 'in-the-air-then-at-rest', name: 'In the Air, Then at Rest', price: 'From $5,500', description: 'Scenic helicopter flight, couples massage, Huon pine bath. 3 nights.' },
  { id: 'the-long-lunch', name: 'The Long Lunch', price: 'From $3,150', description: 'Guided wine trail, four cellar doors, lunch included, couples massage. 3 nights.' },
  { id: 'from-the-water', name: 'From the Water', price: 'From $3,250', description: 'Half day fishing charter, catch returned to the retreat with recipe, couples massage. 3 nights.' },
  { id: 'celebrate-here', name: 'Celebrate Here', price: 'From $3,550', description: 'Private photographer, beach picnic hamper, Huon pine bath. 3 nights.' },
];

const experiences = [
  { id: 'sea-kayaking', name: 'Sea Kayaking', description: 'Guided sea kayaking along the Freycinet Peninsula coastline.' },
  { id: 'fishing-charter', name: 'Fishing Charter', description: 'Half day on Great Oyster Bay with a local skipper. Flathead, trumpeter, squid.' },
  { id: 'helicopter-flight', name: 'Scenic Helicopter Flight', description: 'The East Coast from above. Great Oyster Bay, the Hazards, Wineglass Bay.' },
  { id: 'helicopter-transfer', name: 'Helicopter Transfer from Hobart', description: 'Arrive by air. A helicopter transfer from Hobart lands you at the property direct.' },
  { id: 'hire-car', name: 'Hire Car Delivery', description: 'A hire car arranged and delivered to the property for your stay.' },
  { id: 'wine-trail', name: 'The Wine Trail, Guided', description: 'Four East Coast cellar doors, lunch included, pickup and return from the property.', note: 'Off-property experience. RHR does not serve alcohol on site.' },
  { id: 'couples-massage', name: 'Couples Massage', description: 'A therapist comes to you. Native Kunzea aromatherapy, face ritual, and foot treatment available as add-ons.' },
  { id: 'foraging', name: 'Guided Foraging Session', description: 'The property and surrounding headland, read with a local guide.' },
];

const provisions = [
  { id: 'fruit-box', name: 'Fruit Box', price: '$35', description: 'Seasonal Tasmanian fruit, sourced locally where possible.' },
  { id: 'vegetable-box', name: 'Vegetable Box', price: '$45', description: 'Seasonal vegetables from a local East Coast grower.' },
  { id: 'charcuterie-box', name: 'Charcuterie Box', price: '$185', description: 'Cured meats, cheeses, and local preserves.' },
];

const celebrations = [
  { id: 'photographer', name: 'Private Photographer', price: 'POA', description: 'A half day session on the property and surrounding headland.' },
  { id: 'beach-picnic', name: 'Beach Picnic Setup', price: '$120', description: 'Hamper assembled from local producers, set up on the beach before you arrive.' },
];

const S = {
  bg: '#26333A', bgDark: '#0B0F0F', bgCard: '#2E3D45',
  accent: '#8FA9B3', bone: '#EDE9E3', muted: '#B8AE9F',
  border: 'rgba(143, 169, 179, 0.2)',
  playfair: "'Playfair Display', serif",
  inter: "'Inter', sans-serif",
};

// ── Calendar ───────────────────────────────────────────────────────────────────

function Calendar({ unavailableDates, checkIn, checkOut, onSelectDate, loading }: {
  unavailableDates: Set<string>; checkIn: string | null; checkOut: string | null;
  onSelectDate: (d: string) => void; loading: boolean;
}) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const prevMonth = () => { if (viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else setViewMonth(m=>m-1); };
  const nextMonth = () => { if (viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else setViewMonth(m=>m+1); };
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
  const fmt = (y:number,m:number,d:number) => `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const isPast = (y:number,m:number,d:number) => new Date(y,m,d) < today;
  const isInRange = (ds:string) => checkIn && checkOut && ds > checkIn && ds < checkOut;

  const cells: (number|null)[] = [];
  for (let i=0;i<firstDay;i++) cells.push(null);
  for (let d=1;d<=daysInMonth;d++) cells.push(d);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} style={{color:S.accent,background:'none',border:'none',cursor:'pointer',padding:'0.25rem'}}><ChevronLeft size={20}/></button>
        <span style={{fontFamily:S.playfair,fontSize:'1.125rem',color:S.bone}}>{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} style={{color:S.accent,background:'none',border:'none',cursor:'pointer',padding:'0.25rem'}}><ChevronRight size={20}/></button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={24} style={{color:S.accent,animation:'spin 1s linear infinite'}}/>
          <span style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted,marginLeft:'0.5rem'}}>Loading availability...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d=><div key={d} style={{fontFamily:S.inter,fontSize:'0.75rem',color:S.muted,textAlign:'center',padding:'0.25rem'}}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day,i) => {
              if (!day) return <div key={`e-${i}`}/>;
              const ds = fmt(viewYear,viewMonth,day);
              const past = isPast(viewYear,viewMonth,day);
              const unavail = unavailableDates.has(ds);
              const disabled = past||unavail;
              const isStart = ds===checkIn, isEnd = ds===checkOut, inRange = isInRange(ds);
              let bg = 'transparent', color = S.bone, opacity = 1;
              if (disabled){color=S.muted;opacity=0.35;}
              if (inRange) bg='rgba(143,169,179,0.15)';
              if (isStart||isEnd){bg=S.accent;color=S.bgDark;}
              return (
                <button key={ds} disabled={disabled} onClick={()=>!disabled&&onSelectDate(ds)}
                  style={{background:bg,color,opacity,border:unavail?'1px solid rgba(143,169,179,0.1)':'1px solid transparent',
                    borderRadius:'0.25rem',padding:'0.375rem 0',fontFamily:S.inter,fontSize:'0.875rem',
                    cursor:disabled?'not-allowed':'pointer',textAlign:'center'}}>
                  {day}
                </button>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1"><div style={{width:12,height:12,borderRadius:2,background:S.accent}}/><span style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.muted}}>Selected</span></div>
            <div className="flex items-center gap-1"><div style={{width:12,height:12,borderRadius:2,background:'rgba(143,169,179,0.15)',border:'1px solid rgba(143,169,179,0.3)'}}/><span style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.muted}}>Unavailable</span></div>
          </div>
        </>
      )}
    </div>
  );
}

// ── CheckboxItem ───────────────────────────────────────────────────────────────

function CheckboxItem({ id, name, description, price, note, checked, onChange }: {
  id:string; name:string; description:string; price?:string; note?:string; checked:boolean; onChange:(id:string)=>void;
}) {
  return (
    <div onClick={()=>onChange(id)} style={{
      display:'flex',justifyContent:'space-between',alignItems:'flex-start',
      padding:'1rem',borderRadius:'0.375rem',cursor:'pointer',
      backgroundColor:checked?'rgba(143,169,179,0.08)':'transparent',
      border:checked?`1px solid rgba(143,169,179,0.4)`:`1px solid rgba(143,169,179,0.1)`,
      transition:'all 0.2s ease',marginBottom:'0.5rem',
    }}>
      <div style={{flex:1,paddingRight:'1rem'}}>
        <p style={{fontFamily:S.inter,fontSize:'0.95rem',color:S.bone,marginBottom:'0.25rem',fontWeight:500}}>{name}</p>
        <p style={{fontFamily:S.inter,fontSize:'0.85rem',color:S.muted,lineHeight:'1.6'}}>{description}</p>
        {note&&<p style={{fontFamily:S.inter,fontSize:'0.8rem',color:S.accent,fontStyle:'italic',marginTop:'0.25rem'}}>{note}</p>}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'0.75rem',flexShrink:0}}>
        {price&&<span style={{fontFamily:S.playfair,fontSize:'1rem',color:S.accent}}>{price}</span>}
        <div style={{width:20,height:20,borderRadius:4,border:`2px solid ${checked?S.accent:'rgba(143,169,179,0.4)'}`,
          background:checked?S.accent:'transparent',display:'flex',alignItems:'center',justifyContent:'center',
          transition:'all 0.2s ease',flexShrink:0}}>
          {checked&&<Check size={12} style={{color:S.bgDark}}/>}
        </div>
      </div>
    </div>
  );
}

// ── Step Indicator ─────────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const steps = ['Dates', 'Your Details', 'Add-ons', 'Review'];
  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((label, i) => {
        const num = i + 1;
        const active = step === num;
        const done = step > num;
        return (
          <div key={num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                backgroundColor: done ? S.accent : active ? S.accent : 'transparent',
                border: `2px solid ${done || active ? S.accent : 'rgba(143,169,179,0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}>
                {done
                  ? <Check size={14} style={{ color: S.bgDark }} />
                  : <span style={{ fontFamily: S.inter, fontSize: '0.8rem', color: active ? S.bgDark : S.muted, fontWeight: 600 }}>{num}</span>
                }
              </div>
              <span style={{ fontFamily: S.inter, fontSize: '0.7rem', color: active ? S.accent : S.muted, marginTop: '0.375rem', whiteSpace: 'nowrap' }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 40, height: 1, backgroundColor: step > num ? S.accent : 'rgba(143,169,179,0.2)', margin: '0 0.5rem', marginBottom: '1.25rem', transition: 'all 0.3s ease' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function BookingPage() {
  const [step, setStep] = useState(1);
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(new Set());
  const [availabilityLoading, setAvailabilityLoading] = useState(true);
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [selectingCheckout, setSelectingCheckout] = useState(false);
  const [guests, setGuests] = useState(2);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedProvisions, setSelectedProvisions] = useState<string[]>([]);
  const [selectedCelebrations, setSelectedCelebrations] = useState<string[]>([]);
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', notes:'', voucher:'' });
  const [quoteData, setQuoteData] = useState<any>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/availability')
      .then(r=>r.json())
      .then(data=>{
        const blocked = new Set<string>();
        const days: any[] = data.days||data.availability||data||[];
        if (Array.isArray(days)) days.forEach((d:any)=>{
          if (d.available===false||d.status==='unavailable'||d.status==='booked') blocked.add(d.date||d.day);
        });
        setUnavailableDates(blocked);
      })
      .catch(err=>console.error('Availability fetch failed:',err))
      .finally(()=>setAvailabilityLoading(false));
  }, []);

  const nights = checkIn && checkOut
    ? Math.round((new Date(checkOut).getTime()-new Date(checkIn).getTime())/(1000*60*60*24))
    : 0;

  const handleDateSelect = (date: string) => {
    if (!checkIn||(checkIn&&checkOut)){
      setCheckIn(date); setCheckOut(null); setSelectingCheckout(true); setError(null);
    } else if (selectingCheckout){
      if (date<=checkIn){ setCheckIn(date); setCheckOut(null); }
      else {
        const blocked = Array.from(unavailableDates).some(d=>d>checkIn&&d<date);
        if (blocked){ setError('Your selected range includes unavailable dates.'); return; }
        setCheckOut(date); setSelectingCheckout(false); setError(null);
      }
    }
  };

  const fmt = (d:string) => { const [y,m,day]=d.split('-'); return `${parseInt(day)} ${MONTHS[parseInt(m)-1]} ${y}`; };
  const toggle = (id:string,setFn:React.Dispatch<React.SetStateAction<string[]>>) =>
    setFn(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);

  // Fetch quote when reaching review step
  const goToReview = async () => {
    if (!form.firstName||!form.lastName||!form.email){ setError('Please fill in your first name, last name, and email.'); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)){ setError('Please enter a valid email address.'); return; }
    setError(null);
    setQuoteLoading(true);
    setStep(4);
    try {
      const res = await fetch('/api/create-quote', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ arrival:checkIn, departure:checkOut, adults:guests,
          firstName:form.firstName, lastName:form.lastName, email:form.email,
          phone:form.phone, notes:form.notes, voucher:form.voucher }),
      });
      const data = await res.json();
      if (res.ok) setQuoteData(data);
      else setError(data.error||'Could not retrieve pricing. You can still proceed to payment.');
    } catch(e){ setError('Could not retrieve pricing. You can still proceed to payment.'); }
    finally { setQuoteLoading(false); }
  };

  const handleSubmit = async () => {
    setSubmitting(true); setError(null);
    try {
      const hasAddOns = selectedPackage||selectedExperiences.length||selectedProvisions.length||selectedCelebrations.length;
      if (hasAddOns) {
        fetch('/api/log-addons', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            firstName:form.firstName, lastName:form.lastName, email:form.email, phone:form.phone,
            arrival:checkIn, departure:checkOut, nights, quoteId:quoteData?.quoteId,
            selectedPackage: selectedPackage?packages.find(p=>p.id===selectedPackage)?.name:null,
            selectedExperiences: selectedExperiences.map(id=>experiences.find(e=>e.id===id)?.name),
            selectedProvisions: selectedProvisions.map(id=>provisions.find(p=>p.id===id)?.name),
            selectedCelebrations: selectedCelebrations.map(id=>celebrations.find(c=>c.id===id)?.name),
            voucher:form.voucher, notes:form.notes,
          }),
        }).catch(e=>console.error('Add-on log failed:',e));
      }
      if (quoteData?.paymentUrl) {
        window.location.href = quoteData.paymentUrl;
      } else {
        window.location.href = `https://app.ownerrez.com/booking/${PROPERTY_ID}`;
      }
    } catch(e:any){
      setError('Something went wrong. Please try again or contact us at stay@rockyhillsretreat.com.au');
      setSubmitting(false);
    }
  };

  const cardStyle = { backgroundColor:S.bgCard, borderRadius:'0.5rem', border:`1px solid ${S.border}`, padding:'2rem', marginBottom:'1.5rem' };
  const inputStyle = { width:'100%', padding:'0.625rem 0.875rem', backgroundColor:'rgba(0,0,0,0.3)', border:`1px solid ${S.border}`, borderRadius:'0.375rem', color:S.bone, fontFamily:S.inter, fontSize:'0.95rem', outline:'none' };
  const labelStyle = { fontFamily:S.inter, fontSize:'0.8rem', color:S.muted, display:'block', marginBottom:'0.375rem' };

  return (
    <div className="min-h-screen" style={{backgroundColor:S.bg}}>
      <div className="max-w-[900px] mx-auto px-6 pt-32 pb-24">

        <div className="text-center mb-12">
          <h1 style={{fontFamily:S.playfair,fontSize:'clamp(2.5rem,5vw,3.5rem)',color:S.bone,letterSpacing:'-0.01em',marginBottom:'1rem'}}>Book Your Stay</h1>
          <p style={{fontFamily:S.inter,fontSize:'1.05rem',color:S.muted}}>From $800 per night. Two-night minimum. Book direct for the best rate.</p>
        </div>

        <StepIndicator step={step} />

        {/* ── STEP 1: DATES ── */}
        {step === 1 && (
          <div style={cardStyle}>
            <h2 style={{fontFamily:S.playfair,fontSize:'1.75rem',color:S.bone,marginBottom:'0.5rem'}}>Choose Your Dates</h2>
            <p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted,fontStyle:'italic',marginBottom:'1.5rem'}}>
              {selectingCheckout ? 'Now select your check-out date.' : checkIn ? 'Dates selected.' : 'Select your check-in date.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[{label:'Check-in',val:checkIn},{label:'Check-out',val:checkOut}].map(({label,val})=>(
                <div key={label} style={{padding:'1rem',borderRadius:'0.375rem',border:`1px solid ${val?S.accent:S.border}`,backgroundColor:'rgba(0,0,0,0.2)'}}>
                  <p style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.accent,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:'0.25rem'}}>{label}</p>
                  <p style={{fontFamily:S.playfair,fontSize:'1.125rem',color:val?S.bone:S.muted}}>{val?fmt(val):'Select date'}</p>
                </div>
              ))}
            </div>

            {/* Guest count */}
            <div className="mb-6">
              <p style={{fontFamily:S.inter,fontSize:'0.8rem',color:S.muted,marginBottom:'0.75rem'}}>Number of Guests</p>
              <div className="flex items-center gap-4">
                <button onClick={()=>setGuests(g=>Math.max(1,g-1))}
                  style={{width:36,height:36,borderRadius:'50%',border:`1px solid ${S.border}`,background:'transparent',color:S.bone,cursor:'pointer',fontSize:'1.25rem',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  -
                </button>
                <span style={{fontFamily:S.playfair,fontSize:'1.25rem',color:S.bone,minWidth:'2rem',textAlign:'center'}}>{guests}</span>
                <button onClick={()=>setGuests(g=>Math.min(2,g+1))}
                  style={{width:36,height:36,borderRadius:'50%',border:`1px solid ${S.border}`,background:'transparent',color:S.bone,cursor:'pointer',fontSize:'1.25rem',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  +
                </button>
                <span style={{fontFamily:S.inter,fontSize:'0.85rem',color:S.muted}}>Max 2 guests</span>
              </div>
            </div>

            <Calendar unavailableDates={unavailableDates} checkIn={checkIn} checkOut={checkOut} onSelectDate={handleDateSelect} loading={availabilityLoading}/>

            {checkIn&&checkOut&&(
              <div style={{marginTop:'1rem',padding:'0.75rem 1rem',borderRadius:'0.375rem',backgroundColor:'rgba(143,169,179,0.08)',border:`1px solid rgba(143,169,179,0.2)`}}>
                <p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.accent}}>
                  {nights} night{nights!==1?'s':''} selected
                  {nights<2&&<span style={{color:'#e87878',marginLeft:'0.5rem'}}>(minimum 2 nights)</span>}
                </p>
              </div>
            )}

            {error&&<p style={{fontFamily:S.inter,fontSize:'0.85rem',color:'#e87878',marginTop:'0.75rem'}}>{error}</p>}

            <button onClick={()=>{
              if (!checkIn||!checkOut){setError('Please select your check-in and check-out dates.');return;}
              if (nights<2){setError('Minimum stay is 2 nights.');return;}
              setError(null);setStep(2);
            }} style={{
              marginTop:'1.5rem',width:'100%',padding:'0.875rem',
              backgroundColor:checkIn&&checkOut&&nights>=2?S.accent:'rgba(143,169,179,0.3)',
              color:S.bgDark,border:'none',borderRadius:'0.375rem',
              fontFamily:S.inter,fontSize:'0.95rem',fontWeight:600,
              cursor:checkIn&&checkOut&&nights>=2?'pointer':'not-allowed',
            }}>
              Continue to Your Details
            </button>
          </div>
        )}

        {/* ── STEP 2: DETAILS ── */}
        {step === 2 && (
          <div style={cardStyle}>
            <h2 style={{fontFamily:S.playfair,fontSize:'1.75rem',color:S.bone,marginBottom:'0.5rem'}}>Your Details</h2>
            <p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted,fontStyle:'italic',marginBottom:'1.5rem'}}>We keep these to create your booking. Nothing else.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                {key:'firstName',label:'First Name',placeholder:'First name',type:'text'},
                {key:'lastName',label:'Last Name',placeholder:'Last name',type:'text'},
                {key:'email',label:'Email Address',placeholder:'your@email.com',type:'email'},
                {key:'phone',label:'Phone (Optional)',placeholder:'+61',type:'tel'},
              ].map(f=>(
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]}
                    onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} style={inputStyle}/>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label style={labelStyle}>Voucher / Promo Code</label>
              <input type="text" placeholder="e.g. GO DARK" value={form.voucher}
                onChange={e=>setForm(p=>({...p,voucher:e.target.value}))} style={inputStyle}/>
              <p style={{fontFamily:S.inter,fontSize:'0.75rem',color:S.accent,marginTop:'0.375rem',fontStyle:'italic'}}>
                Go Dark winter offer: enter GO DARK for $1,500 flat rate (Jun-Aug, 3 nights midweek)
              </p>
            </div>

            <div className="mb-6">
              <label style={labelStyle}>Anything else we should know?</label>
              <textarea rows={3} placeholder="Dietary requirements, special occasions, access needs..."
                value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))}
                style={{...inputStyle,resize:'none'}}/>
            </div>

            {error&&<p style={{fontFamily:S.inter,fontSize:'0.85rem',color:'#e87878',marginBottom:'0.75rem'}}>{error}</p>}

            <div className="flex gap-3">
              <button onClick={()=>{setError(null);setStep(1);}} style={{
                flex:1,padding:'0.875rem',backgroundColor:'transparent',color:S.muted,
                border:`1px solid ${S.border}`,borderRadius:'0.375rem',fontFamily:S.inter,fontSize:'0.95rem',cursor:'pointer',
              }}>Back</button>
              <button onClick={()=>{
                if(!form.firstName||!form.lastName||!form.email){setError('Please fill in your first name, last name, and email.');return;}
                if(!/\S+@\S+\.\S+/.test(form.email)){setError('Please enter a valid email address.');return;}
                setError(null);setStep(3);
              }} style={{
                flex:2,padding:'0.875rem',backgroundColor:S.accent,color:S.bgDark,
                border:'none',borderRadius:'0.375rem',fontFamily:S.inter,fontSize:'0.95rem',fontWeight:600,cursor:'pointer',
              }}>Continue to Add-ons</button>
            </div>
          </div>
        )}

        {/* ── STEP 3: ADD-ONS ── */}
        {step === 3 && (
          <div>
            <p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted,textAlign:'center',marginBottom:'1.5rem',fontStyle:'italic'}}>
              All optional. Select anything you would like us to arrange. We will confirm and invoice separately before your arrival.
            </p>

            {[
              {title:'Signature Packages',subtitle:'Select a package and we will confirm details before your arrival.',items:packages,selected:selectedPackage?[selectedPackage]:[],single:true},
              {title:'Experiences',subtitle:'Select anything you would like more information on.',items:experiences,selected:selectedExperiences,single:false},
              {title:'Provisions',subtitle:'Add-ons available to order. Request at least 48 hours before arrival.',items:provisions,selected:selectedProvisions,single:false},
              {title:'Celebrations',subtitle:'For proposals, anniversaries, or a reason you made up.',items:celebrations,selected:selectedCelebrations,single:false},
            ].map(section=>(
              <div key={section.title} style={{...cardStyle,marginBottom:'1rem'}}>
                <h3 style={{fontFamily:S.playfair,fontSize:'1.375rem',color:S.bone,marginBottom:'0.375rem'}}>{section.title}</h3>
                <p style={{fontFamily:S.inter,fontSize:'0.8rem',color:S.muted,fontStyle:'italic',marginBottom:'1rem'}}>{section.subtitle}</p>
                {section.items.map((item:any)=>(
                  <CheckboxItem key={item.id} id={item.id} name={item.name} description={item.description}
                    price={item.price} note={item.note}
                    checked={section.single?selectedPackage===item.id:section.selected.includes(item.id)}
                    onChange={()=>{
                      if(section.single) setSelectedPackage(selectedPackage===item.id?null:item.id);
                      else if(section.title==='Experiences') toggle(item.id,setSelectedExperiences);
                      else if(section.title==='Provisions') toggle(item.id,setSelectedProvisions);
                      else toggle(item.id,setSelectedCelebrations);
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Go Dark reminder */}
            <div style={{backgroundColor:S.bgDark,borderRadius:'0.5rem',border:'1px solid rgba(143,169,179,0.3)',padding:'1.5rem',marginBottom:'1.5rem'}}>
              <p style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.accent,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.5rem',fontWeight:600}}>Winter Offer</p>
              <h3 style={{fontFamily:S.playfair,fontSize:'1.5rem',color:S.bone,marginBottom:'0.5rem'}}>Go Dark</h3>
              <p style={{fontFamily:S.inter,fontSize:'0.9rem',color:S.muted,lineHeight:'1.7',marginBottom:'0.75rem'}}>3 nights midweek. June, July, August. $1,500 flat rate. Direct booking only.</p>
              <p style={{fontFamily:S.inter,fontSize:'0.85rem',color:S.accent,fontStyle:'italic'}}>
                Enter <strong style={{color:S.bone,fontStyle:'normal'}}>GO DARK</strong> in the voucher field to claim.
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={()=>{setError(null);setStep(2);}} style={{
                flex:1,padding:'0.875rem',backgroundColor:'transparent',color:S.muted,
                border:`1px solid ${S.border}`,borderRadius:'0.375rem',fontFamily:S.inter,fontSize:'0.95rem',cursor:'pointer',
              }}>Back</button>
              <button onClick={goToReview} style={{
                flex:2,padding:'0.875rem',backgroundColor:S.accent,color:S.bgDark,
                border:'none',borderRadius:'0.375rem',fontFamily:S.inter,fontSize:'0.95rem',fontWeight:600,cursor:'pointer',
              }}>Review Booking</button>
            </div>
          </div>
        )}

        {/* ── STEP 4: REVIEW ── */}
        {step === 4 && (
          <div style={cardStyle}>
            <h2 style={{fontFamily:S.playfair,fontSize:'1.75rem',color:S.bone,marginBottom:'1.5rem'}}>Review Your Booking</h2>

            {/* Dates + guests */}
            <div style={{padding:'1.25rem',borderRadius:'0.375rem',backgroundColor:'rgba(0,0,0,0.2)',border:`1px solid ${S.border}`,marginBottom:'1rem'}}>
              <p style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.accent,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:'0.75rem'}}>Stay</p>
              <div className="grid grid-cols-3 gap-4">
                <div><p style={{fontFamily:S.inter,fontSize:'0.75rem',color:S.muted,marginBottom:'0.25rem'}}>Check-in</p><p style={{fontFamily:S.playfair,fontSize:'1rem',color:S.bone}}>{checkIn?fmt(checkIn):''}</p></div>
                <div><p style={{fontFamily:S.inter,fontSize:'0.75rem',color:S.muted,marginBottom:'0.25rem'}}>Check-out</p><p style={{fontFamily:S.playfair,fontSize:'1rem',color:S.bone}}>{checkOut?fmt(checkOut):''}</p></div>
                <div><p style={{fontFamily:S.inter,fontSize:'0.75rem',color:S.muted,marginBottom:'0.25rem'}}>Guests</p><p style={{fontFamily:S.playfair,fontSize:'1rem',color:S.bone}}>{guests}</p></div>
              </div>
              <p style={{fontFamily:S.inter,fontSize:'0.85rem',color:S.accent,marginTop:'0.75rem'}}>{nights} nights</p>
            </div>

            {/* Pricing */}
            <div style={{padding:'1.25rem',borderRadius:'0.375rem',backgroundColor:'rgba(0,0,0,0.2)',border:`1px solid ${S.border}`,marginBottom:'1rem'}}>
              <p style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.accent,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:'0.75rem'}}>Accommodation</p>
              {quoteLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 size={16} style={{color:S.accent,animation:'spin 1s linear infinite'}}/>
                  <span style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted}}>Calculating...</span>
                </div>
              ) : quoteData ? (
                <>
                  {(quoteData.charges||[]).map((c:any,i:number)=>(
                    <div key={i} className="flex justify-between mb-2">
                      <span style={{fontFamily:S.inter,fontSize:'0.9rem',color:c.isTax?S.muted:S.bone}}>{c.description}</span>
                      <span style={{fontFamily:S.inter,fontSize:'0.9rem',color:c.isTax?S.muted:S.bone}}>${Number(c.amount).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between mt-3 pt-3" style={{borderTop:`1px solid ${S.border}`}}>
                    <span style={{fontFamily:S.inter,fontSize:'1rem',color:S.bone,fontWeight:600}}>Total</span>
                    <span style={{fontFamily:S.playfair,fontSize:'1.25rem',color:S.accent}}>${Number(quoteData.total).toFixed(2)} AUD</span>
                  </div>
                </>
              ) : (
                <p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted,fontStyle:'italic'}}>
                  Pricing will be confirmed on the payment page.
                </p>
              )}
            </div>

            {/* Guest details */}
            <div style={{padding:'1.25rem',borderRadius:'0.375rem',backgroundColor:'rgba(0,0,0,0.2)',border:`1px solid ${S.border}`,marginBottom:'1rem'}}>
              <p style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.accent,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:'0.75rem'}}>Guest</p>
              <p style={{fontFamily:S.inter,fontSize:'0.9rem',color:S.bone,marginBottom:'0.25rem'}}>{form.firstName} {form.lastName}</p>
              <p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted}}>{form.email}</p>
              {form.phone&&<p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted}}>{form.phone}</p>}
              {form.voucher&&<p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.accent,marginTop:'0.25rem'}}>Voucher: {form.voucher}</p>}
            </div>

            {/* Add-ons summary */}
            {(selectedPackage||selectedExperiences.length||selectedProvisions.length||selectedCelebrations.length) && (
              <div style={{padding:'1.25rem',borderRadius:'0.375rem',backgroundColor:'rgba(0,0,0,0.2)',border:`1px solid ${S.border}`,marginBottom:'1rem'}}>
                <p style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.accent,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:'0.75rem'}}>Add-ons Requested</p>
                <p style={{fontFamily:S.inter,fontSize:'0.8rem',color:S.muted,fontStyle:'italic',marginBottom:'0.75rem'}}>We will confirm and invoice these separately before your arrival.</p>
                {[
                  selectedPackage&&packages.find(p=>p.id===selectedPackage)?.name,
                  ...selectedExperiences.map(id=>experiences.find(e=>e.id===id)?.name),
                  ...selectedProvisions.map(id=>provisions.find(p=>p.id===id)?.name),
                  ...selectedCelebrations.map(id=>celebrations.find(c=>c.id===id)?.name),
                ].filter(Boolean).map((name,i)=>(
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <Check size={12} style={{color:S.accent,flexShrink:0}}/>
                    <p style={{fontFamily:S.inter,fontSize:'0.9rem',color:S.bone}}>{name}</p>
                  </div>
                ))}
              </div>
            )}

            {error&&(
              <div style={{padding:'0.75rem',borderRadius:'0.375rem',backgroundColor:'rgba(232,120,120,0.1)',border:'1px solid rgba(232,120,120,0.3)',marginBottom:'1rem'}}>
                <p style={{fontFamily:S.inter,fontSize:'0.85rem',color:'#e87878',lineHeight:'1.5'}}>{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={()=>{setError(null);setStep(3);}} style={{
                flex:1,padding:'0.875rem',backgroundColor:'transparent',color:S.muted,
                border:`1px solid ${S.border}`,borderRadius:'0.375rem',fontFamily:S.inter,fontSize:'0.95rem',cursor:'pointer',
              }}>Back</button>
              <button onClick={handleSubmit} disabled={submitting} style={{
                flex:2,padding:'0.875rem',backgroundColor:S.accent,color:S.bgDark,
                border:'none',borderRadius:'0.375rem',fontFamily:S.inter,fontSize:'0.95rem',fontWeight:600,
                cursor:submitting?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem',
              }}>
                {submitting?<><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/>Processing...</>:'Proceed to Payment'}
              </button>
            </div>

            <p style={{fontFamily:S.inter,fontSize:'0.75rem',color:S.muted,textAlign:'center',marginTop:'0.75rem',lineHeight:'1.5'}}>
              You will be redirected to a secure payment page to complete your booking.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
