import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Loader2, ChevronDown } from 'lucide-react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const PROPERTY_ID = 485328;

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
  { id: 'wine-trail', name: 'The Wine Trail, Guided', description: 'Four East Coast cellar doors, lunch included, pickup and return from the property.', note: 'Off-property. RHR does not serve alcohol on site.' },
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
  const isInRange = (ds:string) => !!(checkIn && checkOut && ds > checkIn && ds < checkOut);

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
      padding:'0.875rem',borderRadius:'0.375rem',cursor:'pointer',
      backgroundColor:checked?'rgba(143,169,179,0.08)':'transparent',
      border:checked?`1px solid rgba(143,169,179,0.4)`:`1px solid rgba(143,169,179,0.1)`,
      transition:'all 0.2s ease',marginBottom:'0.5rem',
    }}>
      <div style={{flex:1,paddingRight:'1rem'}}>
        <p style={{fontFamily:S.inter,fontSize:'0.9rem',color:S.bone,marginBottom:'0.2rem',fontWeight:500}}>{name}</p>
        <p style={{fontFamily:S.inter,fontSize:'0.8rem',color:S.muted,lineHeight:'1.5'}}>{description}</p>
        {note&&<p style={{fontFamily:S.inter,fontSize:'0.75rem',color:S.accent,fontStyle:'italic',marginTop:'0.2rem'}}>{note}</p>}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'0.75rem',flexShrink:0}}>
        {price&&<span style={{fontFamily:S.playfair,fontSize:'0.95rem',color:S.accent}}>{price}</span>}
        <div style={{width:18,height:18,borderRadius:3,border:`2px solid ${checked?S.accent:'rgba(143,169,179,0.4)'}`,
          background:checked?S.accent:'transparent',display:'flex',alignItems:'center',justifyContent:'center',
          transition:'all 0.2s ease',flexShrink:0}}>
          {checked&&<Check size={11} style={{color:S.bgDark}}/>}
        </div>
      </div>
    </div>
  );
}

// ── Concertina ─────────────────────────────────────────────────────────────────

function Concertina({ title, subtitle, selectedCount, children }: {
  title: string; subtitle: string; selectedCount: number; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{borderRadius:'0.375rem',border:`1px solid ${S.border}`,overflow:'hidden',marginBottom:'0.75rem'}}>
      <button onClick={()=>setOpen(o=>!o)} style={{
        width:'100%',padding:'1rem',backgroundColor:'rgba(0,0,0,0.2)',border:'none',
        display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',
      }}>
        <div style={{textAlign:'left'}}>
          <p style={{fontFamily:S.inter,fontSize:'0.9rem',color:S.bone,fontWeight:500,margin:0}}>
            {title}
            {selectedCount>0&&<span style={{color:S.accent,marginLeft:'0.5rem',fontSize:'0.8rem'}}>({selectedCount} selected)</span>}
          </p>
          <p style={{fontFamily:S.inter,fontSize:'0.75rem',color:S.muted,margin:'0.2rem 0 0',fontStyle:'italic'}}>{subtitle}</p>
        </div>
        <ChevronDown size={18} style={{color:S.accent,transform:open?'rotate(180deg)':'rotate(0)',transition:'transform 0.2s'}}/>
      </button>
      {open&&<div style={{padding:'1rem',backgroundColor:'rgba(0,0,0,0.1)'}}>{children}</div>}
    </div>
  );
}

// ── Step Indicator ─────────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const steps = ['Your Booking', 'Review'];
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, i) => {
        const num = i + 1;
        const active = step === num;
        const done = step > num;
        return (
          <div key={num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div style={{
                width:32,height:32,borderRadius:'50%',
                backgroundColor:done?S.accent:active?S.accent:'transparent',
                border:`2px solid ${done||active?S.accent:'rgba(143,169,179,0.3)'}`,
                display:'flex',alignItems:'center',justifyContent:'center',
              }}>
                {done?<Check size={14} style={{color:S.bgDark}}/>
                  :<span style={{fontFamily:S.inter,fontSize:'0.8rem',color:active?S.bgDark:S.muted,fontWeight:600}}>{num}</span>}
              </div>
              <span style={{fontFamily:S.inter,fontSize:'0.7rem',color:active?S.accent:S.muted,marginTop:'0.375rem'}}>{label}</span>
            </div>
            {i<steps.length-1&&<div style={{width:60,height:1,backgroundColor:step>num?S.accent:'rgba(143,169,179,0.2)',margin:'0 0.5rem',marginBottom:'1.25rem'}}/>}
          </div>
        );
      })}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

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
  const [form, setForm] = useState({
    firstName:'', lastName:'', email:'', phone:'',
    street:'', city:'', state:'', postcode:'', country:'Australia',
    notes:'', voucher:''
  });
  const [quoteData, setQuoteData] = useState<any>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Restore state if returning from payment page
    const saved = sessionStorage.getItem('rhr_booking');
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.checkIn) setCheckIn(s.checkIn);
        if (s.checkOut) setCheckOut(s.checkOut);
        if (s.guests) setGuests(s.guests);
        if (s.form) setForm(s.form);
        if (s.selectedPackage) setSelectedPackage(s.selectedPackage);
        if (s.selectedExperiences) setSelectedExperiences(s.selectedExperiences);
        if (s.selectedProvisions) setSelectedProvisions(s.selectedProvisions);
        if (s.selectedCelebrations) setSelectedCelebrations(s.selectedCelebrations);
        if (s.quoteData) setQuoteData(s.quoteData);
        if (s.step) setStep(s.step);
        sessionStorage.removeItem('rhr_booking');
      } catch(e) { console.error('Failed to restore booking state:', e); }
    }
  }, []);

  useEffect(() => {
    fetch('/api/availability')
      .then(r=>r.json())
      .then(data=>{
        const blocked = new Set<string>();
        const days: any[] = data.days||[];
        days.forEach((d:any)=>{ if(d.available===false) blocked.add(d.date); });
        setUnavailableDates(blocked);
      })
      .catch(err=>console.error('Availability fetch failed:',err))
      .finally(()=>setAvailabilityLoading(false));
  }, []);

  const nights = checkIn&&checkOut
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

  const fmtDate = (d:string) => { const [y,m,day]=d.split('-'); return `${parseInt(day)} ${MONTHS[parseInt(m)-1]} ${y}`; };
  const toggle = (id:string,setFn:React.Dispatch<React.SetStateAction<string[]>>) =>
    setFn(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);

  const goToReview = async () => {
    if (!checkIn||!checkOut){ setError('Please select your check-in and check-out dates.'); return; }
    if (nights<2){ setError('Minimum stay is 2 nights.'); return; }
    if (!form.firstName||!form.lastName||!form.email){ setError('Please fill in your first name, last name, and email.'); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)){ setError('Please enter a valid email address.'); return; }
    if (!form.phone||form.phone.replace(/[^0-9]/g,'').length<6){ setError('Please enter a valid phone number with country code (e.g. +61 400 000 000).'); return; }
    setError(null); setQuoteLoading(true); setStep(2);
    try {
      const res = await fetch('/api/create-quote', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          arrival:checkIn, departure:checkOut, adults:guests,
          firstName:form.firstName, lastName:form.lastName, email:form.email,
          phone:form.phone, street:form.street, city:form.city, state:form.state,
          postcode:form.postcode, country:form.country,
          notes:form.notes, voucher:form.voucher,
        }),
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
      const hasAddOns = !!(selectedPackage||selectedExperiences.length||selectedProvisions.length||selectedCelebrations.length);
      if (hasAddOns) {
        fetch('/api/log-addons', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            firstName:form.firstName, lastName:form.lastName, email:form.email, phone:form.phone,
            street:form.street, city:form.city, state:form.state, postcode:form.postcode, country:form.country,
            arrival:checkIn, departure:checkOut, nights, quoteId:quoteData?.quoteId,
            selectedPackage: selectedPackage?packages.find(p=>p.id===selectedPackage)?.name:null,
            selectedExperiences: selectedExperiences.map(id=>experiences.find(e=>e.id===id)?.name),
            selectedProvisions: selectedProvisions.map(id=>provisions.find(p=>p.id===id)?.name),
            selectedCelebrations: selectedCelebrations.map(id=>celebrations.find(c=>c.id===id)?.name),
            voucher:form.voucher, notes:form.notes,
          }),
        }).catch(e=>console.error('Add-on log failed:',e));
      }
      // Save form state before leaving so back button restores it
      sessionStorage.setItem('rhr_booking', JSON.stringify({
        checkIn, checkOut, guests, form,
        selectedPackage, selectedExperiences, selectedProvisions, selectedCelebrations,
        quoteData, step: 2,
      }));

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
  const sectionHead = { fontFamily:S.playfair, fontSize:'1.25rem', color:S.bone, marginBottom:'1rem', marginTop:'1.5rem' };

  return (
    <div className="min-h-screen" style={{backgroundColor:S.bg}}>
      <div className="max-w-[900px] mx-auto px-6 pt-32 pb-24">

        <div className="text-center mb-10">
          <h1 style={{fontFamily:S.playfair,fontSize:'clamp(2.5rem,5vw,3.5rem)',color:S.bone,letterSpacing:'-0.01em',marginBottom:'1rem'}}>Book Your Stay</h1>
          <p style={{fontFamily:S.inter,fontSize:'1.05rem',color:S.muted}}>From $800 per night. Two-night minimum. Book direct for the best rate.</p>
        </div>

        <StepIndicator step={step} />

        {/* ── STEP 1: EVERYTHING ── */}
        {step === 1 && (
          <div style={cardStyle}>

            {/* DATES */}
            <h2 style={{fontFamily:S.playfair,fontSize:'1.5rem',color:S.bone,marginBottom:'0.5rem'}}>Choose Your Dates</h2>
            <p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted,fontStyle:'italic',marginBottom:'1.5rem'}}>
              {selectingCheckout?'Now select your check-out date.':checkIn?'Dates selected.':'Select your check-in date.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {[{label:'Check-in',val:checkIn},{label:'Check-out',val:checkOut}].map(({label,val})=>(
                <div key={label} style={{padding:'1rem',borderRadius:'0.375rem',border:`1px solid ${val?S.accent:S.border}`,backgroundColor:'rgba(0,0,0,0.2)'}}>
                  <p style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.accent,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:'0.25rem'}}>{label}</p>
                  <p style={{fontFamily:S.playfair,fontSize:'1.125rem',color:val?S.bone:S.muted}}>{val?fmtDate(val):'Select date'}</p>
                </div>
              ))}
            </div>

            {/* Guests */}
            <div className="mb-5">
              <p style={{fontFamily:S.inter,fontSize:'0.8rem',color:S.muted,marginBottom:'0.75rem'}}>Number of Guests</p>
              <div className="flex items-center gap-4">
                <button onClick={()=>setGuests(g=>Math.max(1,g-1))} style={{width:34,height:34,borderRadius:'50%',border:`1px solid ${S.border}`,background:'transparent',color:S.bone,cursor:'pointer',fontSize:'1.2rem',display:'flex',alignItems:'center',justifyContent:'center'}}>-</button>
                <span style={{fontFamily:S.playfair,fontSize:'1.25rem',color:S.bone,minWidth:'2rem',textAlign:'center'}}>{guests}</span>
                <button onClick={()=>setGuests(g=>Math.min(2,g+1))} style={{width:34,height:34,borderRadius:'50%',border:`1px solid ${S.border}`,background:'transparent',color:S.bone,cursor:'pointer',fontSize:'1.2rem',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
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

            {/* YOUR DETAILS */}
            <h2 style={{...sectionHead}}>Your Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                {key:'firstName',label:'First Name',placeholder:'First name',type:'text'},
                {key:'lastName',label:'Last Name',placeholder:'Last name',type:'text'},
                {key:'email',label:'Email Address',placeholder:'your@email.com',type:'email'},
                {key:'phone',label:'Phone (include country code)',placeholder:'+61',type:'tel'},
              ].map(f=>(
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]}
                    onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} style={inputStyle}/>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label style={labelStyle}>Street Address</label>
              <input type="text" placeholder="Street address" value={form.street}
                onChange={e=>setForm(p=>({...p,street:e.target.value}))} style={inputStyle}/>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div><label style={labelStyle}>City</label><input type="text" placeholder="City" value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))} style={inputStyle}/></div>
              <div><label style={labelStyle}>State</label><input type="text" placeholder="State" value={form.state} onChange={e=>setForm(p=>({...p,state:e.target.value}))} style={inputStyle}/></div>
              <div><label style={labelStyle}>Postcode</label><input type="text" placeholder="Postcode" value={form.postcode} onChange={e=>setForm(p=>({...p,postcode:e.target.value}))} style={inputStyle}/></div>
            </div>
            <div className="mb-4">
              <label style={labelStyle}>Country</label>
              <input type="text" placeholder="Country" value={form.country} onChange={e=>setForm(p=>({...p,country:e.target.value}))} style={inputStyle}/>
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

            {/* ADD-ONS */}
            <h2 style={{...sectionHead}}>Optional Add-ons</h2>
            <p style={{fontFamily:S.inter,fontSize:'0.85rem',color:S.muted,fontStyle:'italic',marginBottom:'1rem'}}>
              All optional. Select anything you would like us to arrange. We will confirm and invoice separately before your arrival.
            </p>

            <Concertina title="Signature Packages" subtitle="Curated multi-night experiences" selectedCount={selectedPackage?1:0}>
              {packages.map(pkg=>(
                <CheckboxItem key={pkg.id} id={pkg.id} name={pkg.name} description={pkg.description} price={pkg.price}
                  checked={selectedPackage===pkg.id} onChange={()=>setSelectedPackage(selectedPackage===pkg.id?null:pkg.id)}/>
              ))}
            </Concertina>

            <Concertina title="Experiences" subtitle="Local activities and guided experiences" selectedCount={selectedExperiences.length}>
              {experiences.map(exp=>(
                <CheckboxItem key={exp.id} id={exp.id} name={exp.name} description={exp.description} note={exp.note}
                  checked={selectedExperiences.includes(exp.id)} onChange={()=>toggle(exp.id,setSelectedExperiences)}/>
              ))}
            </Concertina>

            <Concertina title="Provisions" subtitle="Additional food and produce to order" selectedCount={selectedProvisions.length}>
              {provisions.map(prov=>(
                <CheckboxItem key={prov.id} id={prov.id} name={prov.name} description={prov.description} price={prov.price}
                  checked={selectedProvisions.includes(prov.id)} onChange={()=>toggle(prov.id,setSelectedProvisions)}/>
              ))}
            </Concertina>

            <Concertina title="Celebrations" subtitle="For proposals, anniversaries, or a reason you made up" selectedCount={selectedCelebrations.length}>
              {celebrations.map(cel=>(
                <CheckboxItem key={cel.id} id={cel.id} name={cel.name} description={cel.description} price={cel.price}
                  checked={selectedCelebrations.includes(cel.id)} onChange={()=>toggle(cel.id,setSelectedCelebrations)}/>
              ))}
            </Concertina>

            {/* Go Dark reminder */}
            <div style={{backgroundColor:S.bgDark,borderRadius:'0.5rem',border:'1px solid rgba(143,169,179,0.3)',padding:'1.25rem',marginBottom:'1.5rem',marginTop:'0.5rem'}}>
              <p style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.accent,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.4rem',fontWeight:600}}>Winter Offer</p>
              <h3 style={{fontFamily:S.playfair,fontSize:'1.375rem',color:S.bone,marginBottom:'0.4rem'}}>Go Dark</h3>
              <p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted,lineHeight:'1.7',marginBottom:'0.5rem'}}>3 nights midweek. June, July, August. $1,500 flat rate. Direct booking only.</p>
              <p style={{fontFamily:S.inter,fontSize:'0.8rem',color:S.accent,fontStyle:'italic'}}>
                Enter <strong style={{color:S.bone,fontStyle:'normal'}}>GO DARK</strong> in the voucher field above to claim.
              </p>
            </div>

            {error&&<p style={{fontFamily:S.inter,fontSize:'0.85rem',color:'#e87878',marginBottom:'1rem'}}>{error}</p>}

            <button onClick={goToReview} style={{
              width:'100%',padding:'1rem',backgroundColor:S.accent,color:S.bgDark,
              border:'none',borderRadius:'0.375rem',fontFamily:S.inter,fontSize:'1rem',fontWeight:600,cursor:'pointer',
            }}>
              Review My Booking
            </button>
          </div>
        )}

        {/* ── STEP 2: REVIEW ── */}
        {step === 2 && (
          <div style={cardStyle}>
            <h2 style={{fontFamily:S.playfair,fontSize:'1.75rem',color:S.bone,marginBottom:'1.5rem'}}>Review Your Booking</h2>

            {/* Stay */}
            <div style={{padding:'1.25rem',borderRadius:'0.375rem',backgroundColor:'rgba(0,0,0,0.2)',border:`1px solid ${S.border}`,marginBottom:'1rem'}}>
              <p style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.accent,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:'0.75rem'}}>Stay</p>
              <div className="grid grid-cols-3 gap-4">
                <div><p style={{fontFamily:S.inter,fontSize:'0.75rem',color:S.muted,marginBottom:'0.25rem'}}>Check-in</p><p style={{fontFamily:S.playfair,fontSize:'1rem',color:S.bone}}>{checkIn?fmtDate(checkIn):''}</p></div>
                <div><p style={{fontFamily:S.inter,fontSize:'0.75rem',color:S.muted,marginBottom:'0.25rem'}}>Check-out</p><p style={{fontFamily:S.playfair,fontSize:'1rem',color:S.bone}}>{checkOut?fmtDate(checkOut):''}</p></div>
                <div><p style={{fontFamily:S.inter,fontSize:'0.75rem',color:S.muted,marginBottom:'0.25rem'}}>Guests</p><p style={{fontFamily:S.playfair,fontSize:'1rem',color:S.bone}}>{guests}</p></div>
              </div>
              <p style={{fontFamily:S.inter,fontSize:'0.85rem',color:S.accent,marginTop:'0.75rem'}}>{nights} nights</p>
            </div>

            {/* Pricing */}
            <div style={{padding:'1.25rem',borderRadius:'0.375rem',backgroundColor:'rgba(0,0,0,0.2)',border:`1px solid ${S.border}`,marginBottom:'1rem'}}>
              <p style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.accent,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:'0.75rem'}}>Accommodation</p>
              {quoteLoading?(
                <div className="flex items-center gap-2">
                  <Loader2 size={16} style={{color:S.accent,animation:'spin 1s linear infinite'}}/>
                  <span style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted}}>Calculating...</span>
                </div>
              ):quoteData?(
                <>
                  {(quoteData.charges||[]).map((c:any,i:number)=>{
                    // Reformat charge description
                    let desc = c.description || '';
                    // Convert US dates like 6/22 to 22 Jun
                    desc = desc.replace(/(\d{1,2})\/(\d{1,2})/g, (_:string, m:string, d:string) => {
                      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                      return `${d} ${months[parseInt(m)-1]}`;
                    });
                    // Remove "during Standard" and rate info, keep night count
                    desc = desc.replace(/\s*during\s+\S+(\s+at\s+\$[\d.]+\s+per\s+\S+\s+night)?/i, '');
                    // Add "ex GST" note to rent lines
                    if (!c.isTax && desc.includes('night')) {
                      const rate = (c.amount / (quoteData.nights||nights)).toFixed(2);
                      desc = desc.replace(/\(([^)]+)\)/, `($1)`);
                    }
                    return (
                      <div key={i} className="flex justify-between mb-2">
                        <span style={{fontFamily:S.inter,fontSize:'0.875rem',color:c.isTax?S.muted:S.bone}}>{desc}</span>
                        <span style={{fontFamily:S.inter,fontSize:'0.875rem',color:c.isTax?S.muted:S.bone}}>${Number(c.amount).toFixed(2)}</span>
                      </div>
                    );
                  })}
                  {form.voucher&&(
                    <div className="flex justify-between mb-2">
                      <span style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.accent}}>Discount: {form.voucher}</span>
                      <span style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.accent}}>Applied</span>
                    </div>
                  )}
                  <div className="flex justify-between mt-3 pt-3" style={{borderTop:`1px solid ${S.border}`}}>
                    <span style={{fontFamily:S.inter,fontSize:'1rem',color:S.bone,fontWeight:600}}>Total</span>
                    <span style={{fontFamily:S.playfair,fontSize:'1.25rem',color:S.accent}}>${Number(quoteData.total).toFixed(2)} AUD</span>
                  </div>
                </>
              ):(
                <p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted,fontStyle:'italic'}}>Pricing will be confirmed on the payment page.</p>
              )}
            </div>

            {/* Guest */}
            <div style={{padding:'1.25rem',borderRadius:'0.375rem',backgroundColor:'rgba(0,0,0,0.2)',border:`1px solid ${S.border}`,marginBottom:'1rem'}}>
              <p style={{fontFamily:S.inter,fontSize:'0.7rem',color:S.accent,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:'0.75rem'}}>Guest</p>
              <p style={{fontFamily:S.inter,fontSize:'0.9rem',color:S.bone,marginBottom:'0.25rem'}}>{form.firstName} {form.lastName}</p>
              <p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted}}>{form.email}</p>
              {form.phone&&<p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted}}>{form.phone}</p>}
              {form.street&&<p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.muted}}>{form.street}, {form.city} {form.state} {form.postcode}</p>}
            </div>

            {/* Add-ons */}
            {!!(selectedPackage||selectedExperiences.length||selectedProvisions.length||selectedCelebrations.length)&&(
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
                    <p style={{fontFamily:S.inter,fontSize:'0.875rem',color:S.bone}}>{name}</p>
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
              <button onClick={()=>{setError(null);setSubmitting(false);setStep(1);}} style={{
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
