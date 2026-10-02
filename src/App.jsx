import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Award, BriefcaseBusiness, Building2, CalendarDays, ChevronDown, ChevronRight,
  CirclePlay, Compass, Landmark, Mail, Menu, Plane, Radio, Shield, Ship, Users, Wrench, X
} from "lucide-react";
import { getJson } from "./api.js";
import { aircraftImages } from "./aircraftImages.js";
import LocationMap from "./LocationMap.jsx";
import heroPoster from "../Media/Hero1.png";
import recruitmentPoster from "../Media/optimized/recruitmentposter.jpg";
import viennaDiplomacy from "../Media/optimized/Viennadiplomacy.jpg";
import belgianRoundel from "../Media/Roundel_of_Belgium.svg.png";

const aircraftGroups = ["All aircraft", "Fighter", "Transport", "Helicopter", "Training", "Support"];
const newsGroups = ["All", "Formation", "Leadership", "Development", "Foreign affairs", "Operations"];
const mediaGallery = [
  { src: heroPoster, title: "Hero1", caption: "Hero artwork · Air Force", alt: "F-16 aircraft artwork with Belgian Air Force branding" },
  { src: recruitmentPoster, title: "Belgian Air Force – 2026 Recruitment Poster", caption: "Recruitment · 2026", alt: "Belgian Air Force recruitment poster with aircraft artwork and a QR code" },
  { src: viennaDiplomacy, title: "Sioux flight to Vienna", caption: "Official visit · 24 September 2026", alt: "transport flight poster showing a flight to Vienna, Austria" },
  { src: belgianRoundel, title: "Roundel of Belgium", caption: "Insignia · Reference artwork", alt: "Roundel of Belgium in black, yellow and red concentric circles" }
];
const dateLabel = (value) => new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));

function useHashRoute() {
  const [route, setRoute] = useState(() => decodeURIComponent(location.hash.slice(1) || "home"));
  useEffect(() => {
    const sync = () => setRoute(decodeURIComponent(location.hash.slice(1) || "home"));
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [route]);
  return route;
}

function Art({ variant = "fighter", className = "" }) {
  return <div className={`art art-${variant} ${className}`} role="img" aria-label={`${variant} aircraft illustration`}>
    <span className="art-kicker">BELGIAN AIR FORCE</span>
    {variant === "helicopter" ? <svg viewBox="0 0 840 350" aria-hidden="true" focusable="false">
      <path className="aircraft-shape" d="M268 191 321 151 468 147 514 168 628 177 663 191 628 203 514 211 470 233 333 230 288 215 223 213 203 203 224 194Z" />
      <path className="art-shadow" d="m347 211 116 2 34 20-162-3Zm139-75 7-8 4 40h-9Zm-48 15 5-42 5-3 6 45Z" />
      <path d="M198 116h440M411 113v34M298 232l-12 23m188-20 16 20" fill="none" stroke="#e5e9e6" strokeWidth="6" strokeLinecap="round" />
      <path className="art-roundel" d="M555 181a11 11 0 1 0 0 22 11 11 0 0 0 0-22Z" />
    </svg> : variant === "transport" ? <svg viewBox="0 0 840 350" aria-hidden="true" focusable="false">
      <path className="aircraft-shape" d="M93 191 292 169 365 76 419 77 396 163 575 157 652 113 690 116 669 163 800 169 826 184 801 197 668 205 689 249 651 251 575 211 396 204 418 286 364 286 292 198Z" />
      <path className="art-shadow" d="m292 186 74 8 51 88-52 1-73-91Zm104-11 180 5 76 38-23 3-79-29-154-7Z" />
      <path className="art-roundel" d="M541 173a12 12 0 1 0 0 24 12 12 0 0 0 0-24Z" />
    </svg> : <svg viewBox="0 0 840 350" aria-hidden="true" focusable="false">
      <path className="aircraft-shape" d="M88 185 369 157 420 66 454 68 449 153 594 139 663 101 690 104 672 145 794 155 824 175 794 193 672 202 690 239 663 242 594 209 449 197 454 282 420 284 369 194 88 185Z" />
      <path className="art-shadow" d="m369 181 51 7 34 91-34 5-51-91Zm80-10 147 7 67 36-19 3-77-26-119-9Z" />
      <path className="art-roundel" d="M552 167a13 13 0 1 0 0 26 13 13 0 0 0 0-26Z" />
    </svg>}
    <span className="art-grid" />
    <span className="art-caption">AIR FORCE</span>
  </div>;
}

function ImageWithFallback({ src, alt, variant = "fighter", className = "", fallbackClassName = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Art variant={variant} className={fallbackClassName || className} />;
  return <img className={className} src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

function Eyebrow({ children }) { return <span className="eyebrow">{children}</span>; }
function SectionTitle({ eyebrow, title, text, action }) {
  return <div className="section-title"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>;
}
function LinkButton({ href, children, quiet = false }) {
  return <a className={`link-button ${quiet ? "quiet" : ""}`} href={href}>{children}<ArrowRight size={15} /></a>;
}
function ArrowLink({ href, children }) { return <a className="arrow-link" href={href}>{children}<ArrowUpRight size={14} /></a>; }

export default function App() {
  const route = useHashRoute();
  const [data, setData] = useState({ aircraft: [], bases: [], force: null, leadership: [], news: [], organization: [], organizationStructure: { commandStaff: [], wings: [], squadronRoles: [], supportUnits: [] }, values: [] });
  const [loadError, setLoadError] = useState("");
  const [category, setCategory] = useState("All");
  const [aircraftFilter, setAircraftFilter] = useState("All aircraft");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [contactState, setContactState] = useState("");

  useEffect(() => {
    Promise.all(["aircraft", "bases", "force", "leadership", "news", "organization", "organization/structure", "values"].map(async (endpoint) => [endpoint === "organization/structure" ? "organizationStructure" : endpoint, await getJson(`/${endpoint}`)]))
      .then((entries) => { setData(Object.fromEntries(entries)); setLoadError(""); })
      .catch((error) => setLoadError(error instanceof Error && typeof error.message === "string" ? error.message : "An unexpected error occurred while loading public information."));
  }, []);

  useEffect(() => { setMobileMenu(false); }, [route]);

  const [routeType, routeId] = route.split("/");
  const selectedAircraft = useMemo(() => data.aircraft.find((item) => item.id === routeId), [data.aircraft, routeId]);
  const filteredNews = useMemo(() => category === "All" ? data.news : data.news.filter((item) => item.category === category), [category, data.news]);
  const filteredAircraft = useMemo(() => aircraftFilter === "All aircraft" ? data.aircraft : data.aircraft.filter((item) => item.category === aircraftFilter), [aircraftFilter, data.aircraft]);

  function submitContact(event) {
    event.preventDefault();
    setContactState("This demo form is not connected. No message has been sent.");
  }

  return <div className="site">
    <a className="skip-link" href="#main">Skip to main content</a>
    <div className="utility-bar"><div><span className="belgian-mark" aria-hidden="true"><i /><i /><i /></span><span>BELGIAN AIR FORCE</span></div><a href="#legal">About this site <ArrowUpRight size={12} /></a></div>
    <header className="site-header">
      <a className="identity" href="#home" aria-label="Belgian Air Force home"><span className="identity-mark"><img src={belgianRoundel} alt="" /></span><span><strong>BELGIAN AIR FORCE</strong></span></a>
      <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenu}>{mobileMenu ? <X /> : <Menu />}</button>
      <nav className={`primary-nav ${mobileMenu ? "open" : ""}`} aria-label="Main navigation">
        <a href="#home">Home</a>
        <details className="nav-dropdown"><summary>About <ChevronDown size={12} /></summary><div className="dropdown-panel"><a href="#about">Our story</a><a href="#organization">Organization</a><a href="#leadership">Leadership</a></div></details>
        <details className="nav-dropdown"><summary>Our force <ChevronDown size={12} /></summary><div className="dropdown-panel"><a href="#aircraft">Aircraft</a><a href="#bases">Bases</a><a href="#missions">What we do</a></div></details>
        <a href="#news">News</a><a href="#recruitment">Join the force</a><a href="#media">Media</a>
        <a className="nav-contact" href="#contact">Contact <ArrowUpRight size={13} /></a>
      </nav>
    </header>
    <main id="main" tabIndex="-1">
      {loadError && <div role="alert" className="load-error">Some public information could not be loaded. {loadError}</div>}
      {routeType === "home" && <Home data={data} />}
      {routeType === "about" && <About data={data} />}
      {routeType === "leadership" && <Leadership data={data} />}
      {routeType === "organization" && <Organization data={data} />}
      {routeType === "missions" && <Missions data={data} />}
      {routeType === "aircraft" && routeId && <AircraftDetail item={selectedAircraft} />}
      {routeType === "aircraft" && !routeId && <AircraftPage aircraft={filteredAircraft} filter={aircraftFilter} onFilter={setAircraftFilter} />}
      {routeType === "bases" && <Bases data={data} selectedId={routeId} />}
      {routeType === "news" && routeId ? <NewsDetail item={data.news.find((item) => item.id === routeId)} /> : routeType === "news" && <NewsPage news={filteredNews} category={category} onCategory={setCategory} />}
      {routeType === "recruitment" && <Recruitment profile={data.force} />}
      {routeType === "media" && <Media aircraft={data.aircraft} />}
      {routeType === "contact" && <Contact onSubmit={submitContact} message={contactState} profile={data.force} />}
      {["accessibility", "privacy", "legal"].includes(routeType) && <PolicyPage kind={routeType} data={data} />}
      {!["home", "about", "leadership", "organization", "missions", "aircraft", "bases", "news", "recruitment", "media", "contact", "accessibility", "privacy", "legal"].includes(routeType) && <NotFound />}
    </main>

    <Footer />
  </div>;
}

function Home({ data }) {
  return <>
    <section className="hero">
      <img className="hero-poster" src={heroPoster} alt="" fetchPriority="high" />
      <div className="hero-scrim" />
      <div className="hero-content"><Eyebrow>BELGIAN AIR FORCE</Eyebrow><h1>Air power.<br /><em>Built for the skies.</em></h1><p>{data.force?.mission ?? "Safeguarding Belgian and allied airspace, supporting joint operations and contributing to international security."}</p><div className="hero-actions"><LinkButton href="#missions">Our mission</LinkButton><a href="#about" className="hero-secondary">Our story <ArrowDown size={14} /></a></div></div>
      <div className="hero-index"><span>01</span><i /> AIR FORCE</div>
      <div className="hero-side-label">READINESS · SERVICE · COOPERATION</div>
    </section>
    <div className="notice"><span className="notice-seal"><Shield size={16} /></span><p><strong>Independent force identity.</strong> {data.force?.affiliationPolicy ?? "The Belgian Air Force maintains an independent identity."}</p><a href="#organization">Explore the structure <ArrowRight size={14} /></a></div>
    <section className="content-section mission-intro"><div className="mission-copy"><Eyebrow>OUR AIR FORCE</Eyebrow><h2>A branch.<br />One shared purpose.</h2></div><div className="mission-detail"><p>{data.force?.mission}</p><p>Explore the force's history, leadership, aircraft, stations, organization and international relationships.</p><LinkButton href="#about" quiet>About the Belgian Air Force</LinkButton></div><div className="mission-stamp"><span>BAF</span><small>AIR FORCE</small></div></section>
    <section className="feature-dark"><div className="section-wrap"><SectionTitle eyebrow="AIRCRAFT" title="Aircraft in the force" text="Fleet types, variants and published inventory status." action={<ArrowLink href="#aircraft">Explore the fleet</ArrowLink>} /><div className="featured-grid">{data.aircraft.filter((item) => ["f-16a", "f-35a", "rafale"].includes(item.id)).map((item, index) => <AircraftCard key={item.id} item={item} index={index} />)}</div></div></section>
    <section className="content-section news-preview"><SectionTitle eyebrow="FORCE UPDATES" title="History and current affairs" text="Milestones, capability development and international engagement." action={<ArrowLink href="#news">All updates</ArrowLink>} /><div className="news-grid">{data.news.slice(0, 3).map((item) => <NewsCard key={item.id} item={item} />)}</div></section>
    <Callout href="#recruitment" kicker="RECRUITMENT" title="Enlist in the Belgian Air Force." text="Contact the Recruitment Office to learn about joining and current application steps." action="Contact recruitment" />
  </>;
}

function PageHero({ eyebrow, title, intro, variant = "transport", photo }) {
  return <section className="page-hero">{photo ? <ImageWithFallback src={photo.src} alt={photo.alt} variant={variant} className="page-hero-photo" fallbackClassName="page-hero-art" /> : <Art variant={variant} className="page-hero-art" />}<div className="page-hero-shade" /><div className="page-hero-content"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{intro}</p>{photo?.source ? <a className="photo-credit" href={photo.source} target="_blank" rel="noreferrer">Photo: {photo.credit} · {photo.license}</a> : photo && <span className="photo-credit">{photo.credit} · {photo.license}</span>}</div></section>;
}

function About({ data }) {
  const profile = data.force;
  return <>
    <PageHero eyebrow="ABOUT THE BELGIAN AIR FORCE" title="A force with a clear purpose." intro="The aerial warfare branch of Belgium, responsible for protecting airspace and supporting national and international operations." variant="transport" />
    <section className="content-section editorial"><div className="editorial-aside"><Eyebrow>OUR IDENTITY</Eyebrow><span className="big-year">2025<small>FOUNDED<br/>{profile?.foundingDate}</small></span></div><div className="editorial-copy"><h2>{profile?.name}</h2><p>{profile?.mission}</p><p>{profile?.vision}</p><p><strong>Headquarters:</strong> {profile?.headquarters}. The force code is {profile?.code}; its Dutch and French names are {profile?.languages?.join(" and ")}.</p><p><strong>Founded by:</strong> {profile?.foundedBy}. The membership roster is not published.</p></div></section>
    <section className="content-section"><SectionTitle eyebrow="MISSION & FUNCTIONS" title="How the force serves" text="Five core functions describe the Belgian Air Force's responsibilities."/><div className="mission-cards">{profile?.functions?.map((item,index)=><InfoCard key={item.title} icon={[Shield,Plane,Radio,Award,Compass][index]} title={item.title} text={item.description}/>)}</div></section>
    <section className="timeline-section"><div className="section-wrap"><SectionTitle eyebrow="HISTORY" title="Key milestones" text="Founding, reorganization, development and recorded events."/><div className="timeline">{profile?.history?.map((item)=><article className="timeline-item" key={item.date+item.title}><span>{item.date}</span><i/><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div><div className="recognition-list">{profile?.recognition?.map((record)=><span key={record.label}><strong>{record.label}:</strong> {record.date}</span>)}</div></div></section>
    <section className="content-section"><SectionTitle eyebrow="FOREIGN AFFAIRS" title="International relationships" text="Publicly stated partnerships, agreements and policy positions."/><div className="three-cards">{profile?.foreignAffairs?.map((item)=><InfoCard key={item.title} icon={Compass} title={item.title} text={item.description}/>)}</div></section>
    <section className="soft-section"><div className="section-wrap"><SectionTitle eyebrow="TECHNOLOGY & DEVELOPMENT" title="Systems and technical partnerships" text="Programs described in the force's development record."/><div className="three-cards">{profile?.technology?.map((item)=><InfoCard key={item.title} icon={Radio} title={item.title} text={item.description}/>)}</div></div></section>
    <section className="content-section values-section"><SectionTitle eyebrow="WHAT GUIDES US" title="Principles put into practice" text="Values matter when they guide decisions, teamwork and daily conduct."/><div className="values-grid">{data.values.map((value,index)=><article className="value-card" key={value.title}><span>0{index+1}</span><h3>{value.title}</h3><p>{value.description}</p></article>)}</div></section>
    <div className="editorial-note"><Shield size={17}/><p>{profile?.rightsNotice}</p></div>
  </>;
}

function Leadership({ data }) {
  return <>
    <PageHero eyebrow="AIR FORCE LEADERSHIP" title="Command and oversight." intro="Publicly listed leadership of the Belgian Air Force." variant="fighter" />
    <section className="content-section"><SectionTitle eyebrow="BELGIAN AIR FORCE" title="Force leadership" text="The public leadership roster and assigned responsibilities."/><div className="leader-grid">{data.leadership.map((leader,index)=><article className="leader-card" key={leader.id}><div className="leader-portrait"><span><Users size={30}/></span><b>LEADERSHIP · {String(index+1).padStart(2,"0")}</b></div><div className="leader-info"><Eyebrow>{leader.title}</Eyebrow><h3>{leader.name}</h3><p>{leader.biography}</p><div className="focus-tags">{leader.focus.map((focus)=><span key={focus}>{focus}</span>)}</div></div></article>)}</div></section>
    <section className="soft-section"><div className="section-wrap"><SectionTitle eyebrow="COMMAND RESPONSIBILITIES" title="Oversight and direction" text="Command roles connect force-wide leadership with organizational oversight."/><div className="three-cards">{data.organizationStructure.commandStaff.map((item)=><InfoCard key={item.title} icon={Landmark} title={item.title} text={item.name}/>)}</div></div></section>
  </>;
}

function Organization({ data }) {
  return <>
    <PageHero eyebrow="HOW WE ARE ORGANIZED" title="Command, wings and units." intro="The command hierarchy connects headquarters, operational formations, training and specialist support." variant="helicopter"/>
    <section className="content-section"><SectionTitle eyebrow="AIR FORCE STRUCTURE" title="Force formations" text="Command and operational formations listed in the organization register."/><div className="org-chart"><div className="org-root"><Landmark size={20}/><span>Belgian Air Force Headquarters</span><small>Command · coordination · administration</small></div><div className="org-connector"/><div className="org-branches">{data.organizationStructure.wings.map((formation)=><article className="org-branch" key={formation.id}><span className="org-mark"><Building2 size={18}/></span><div><Eyebrow>FORMATION</Eyebrow><h3>{formation.title}</h3><p>{formation.description}</p></div></article>)}</div></div><div className="squadron-section"><SectionTitle eyebrow="SQUADRONS & SPECIALIST UNITS" title="Roles, equipment and stations" text="Unit-level assignments as listed in the force structure."/><div className="squadron-grid">{data.organizationStructure.squadronRoles.map((unit)=><article className="squadron-card" key={unit.id}><span><Radio size={17}/></span><h3>{unit.title}</h3><p>{unit.description}</p><dl><div><dt>Role</dt><dd>{unit.role}</dd></div><div><dt>Equipment</dt><dd>{unit.equipment}</dd></div><div><dt>Station</dt><dd>{unit.station}</dd></div></dl></article>)}</div></div></section>
    <section className="soft-section"><div className="section-wrap"><SectionTitle eyebrow="HEADQUARTERS & CONTROL" title="Command and enabling units" text="Specialist offices and control functions support force operations."/><div className="unit-table-wrap"><table className="unit-table"><thead><tr><th>Unit</th><th>Role</th><th>Station</th></tr></thead><tbody>{data.organizationStructure.supportUnits.map((item)=><tr key={item.unit}><th scope="row">{item.unit}</th><td>{item.role}</td><td>{item.station}</td></tr>)}</tbody></table></div></div></section>
    <section className="content-section"><SectionTitle eyebrow="FUNCTIONAL ORGANIZATION" title="Core areas" text="The force's operational and enabling responsibilities."/><div className="org-role-grid">{data.organization.map((item)=><InfoCard key={item.id} icon={iconFor(item.icon)} title={item.title} text={item.description}/>)}</div></section>
  </>;
}

function Missions({ data }) {
  return <>
    <PageHero eyebrow="MISSION, VISION & FUNCTIONS" title="Airpower in service of Belgium." intro={data.force?.mission} variant="fighter"/>
    <section className="content-section"><SectionTitle eyebrow="OUR FUNCTIONS" title="Core mission areas" text={data.force?.vision}/><div className="mission-cards">{data.force?.functions?.map((item,index)=><InfoCard key={item.title} icon={[Shield,Plane,Radio,Award,Compass][index]} title={item.title} text={item.description}/>)}</div></section>
    <section className="mission-band"><div><Eyebrow>OPERATIONAL PRIORITIES</Eyebrow><h2>Readiness, cooperation, responsibility.</h2><p>Maintain a high state of readiness, respond to emerging needs and contribute to collective security.</p><LinkButton href="#organization">See the force structure</LinkButton></div><span className="mission-band-seal"><Shield size={68}/></span></section>
  </>;
}

function AircraftPage({ aircraft, filter, onFilter }) {
  return <>
    <PageHero eyebrow="AIRCRAFT" title="Aircraft in the force." intro="Browse the aircraft inventory, variants and published service status." variant="transport" />
    <section className="content-section"><SectionTitle eyebrow="AIRCRAFT DIRECTORY" title="Fleet inventory" text="Types, operational roles and reported inventory status."/><div className="filter-row" aria-label="Filter aircraft by category">{aircraftGroups.map((item)=><button className={filter===item?"selected":""} onClick={()=>onFilter(item)} key={item}>{item}</button>)}</div><div className="fleet-grid">{aircraft.map((item,index)=><AircraftCard item={item} index={index} key={item.id}/>)}</div></section>
  </>;
}

function AircraftCard({ item, index }) {
  const photo = aircraftImages[item.id];
  return <a className={`fleet-card fleet-${index%3}`} href={`#aircraft/${item.id}`}><div className="fleet-art fleet-photo"><ImageWithFallback src={photo?.src} alt="" variant={item.image} fallbackClassName="fleet-photo-fallback" /></div><div className="fleet-info"><Eyebrow>{item.category.toUpperCase()} · {item.role}</Eyebrow><h3>{item.name}</h3><p>{item.summary}</p><span className="fleet-link">Aircraft profile <ArrowRight size={14}/></span></div></a>;
}

function AircraftDetail({ item }) {
  if (!item) return <NotFound />;
  return <>
    <div className="detail-top"><a href="#aircraft"><ArrowLeft size={15}/> Aircraft directory</a><span>{item.category}</span></div>
    <PageHero eyebrow={`${item.category.toUpperCase()} AIRCRAFT`} title={item.name} intro={item.summary} variant={item.image} photo={aircraftImages[item.id]}/>
    <section className="content-section detail-layout"><div className="detail-main"><Eyebrow>AIRCRAFT PROFILE</Eyebrow><h2>Capability shaped around the mission.</h2><p>{item.overview}</p><h3>Roles</h3><ul className="capability-list">{item.capabilities.map((capability)=><li key={capability}><span><ChevronRight size={14}/></span>{capability}</li>)}</ul><h3>Role in the roster</h3><p>{item.role}. This profile describes the aircraft's place in the air force.</p></div><aside className="spec-panel"><Eyebrow>AT A GLANCE</Eyebrow><h3>Aircraft profile</h3><dl>{item.specifications.map((spec)=><div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl></aside></section>
    <section className="soft-section"><div className="section-wrap detail-back"><p>Explore other aircraft in the public fleet directory.</p><LinkButton href="#aircraft" quiet>Back to aircraft</LinkButton></div></section>
  </>;
}

function Bases({ data, selectedId }) {
  const selectedBase = data.bases.find((base) => base.id === selectedId);
  return <>
    <PageHero eyebrow="BASES & STATIONS" title="Places across the force." intro="Explore the airfields and coordination locations that support the air force." variant="transport" />
    <section className="content-section"><SectionTitle eyebrow="INSTALLATION DIRECTORY" title="Bases, airfields and control locations" text="Mapped locations and their publicly listed units."/><div className="base-layout"><div className="location-map-panel"><LocationMap bases={data.bases} selectedId={selectedId}/><div className="map-overseas"><span>OVERSEAS LOCATION</span><a href="#bases/luke-afb" className={selectedId==="luke-afb"?"map-overseas-selected":""}><i/><span>Luke AFB (AZ)<small>Arizona, United States · Select to locate on map</small></span><ArrowUpRight size={14}/></a></div></div><div className="base-list">{data.bases.map((base,index)=><article id={`base-${base.id}`} className={`base-item ${base.id===selectedId?"base-selected":""}`} key={base.id}><span className="base-number">{String(index+1).padStart(2,"0")}</span><div><Eyebrow>{base.region}</Eyebrow><h3>{base.name}</h3><p>{base.description}</p><span className="base-role">{base.role}</span>{base.units?.length>0&&<ul className="base-units">{base.units.map((unit)=><li key={unit}>{unit}</li>)}</ul>}</div></article>)}</div></div>{selectedBase&&<div className="base-selected-panel"><Eyebrow>AIR FORCE LOCATION</Eyebrow><h3>{selectedBase.name}</h3><p>{selectedBase.description}</p><span>{selectedBase.role} · {selectedBase.region}</span>{selectedBase.units?.length>0&&<p><strong>Units:</strong> {selectedBase.units.join(", ")}</p>}<a href="#bases">Return to all locations <ArrowRight size={13}/></a></div>}</section>
  </>;
}

function NewsPage({ news, category, onCategory }) {
  return <>
    <PageHero eyebrow="NEWS & HISTORY" title="Stories from the force." intro="Updates on milestones, capability development, operations and international engagement." variant="fighter"/>
    <section className="content-section"><SectionTitle eyebrow="UPDATES & FEATURES" title="Force news" text="Browse dated records by topic."/><div className="filter-row" aria-label="Filter news by topic">{newsGroups.map((item)=><button className={category===item?"selected":""} onClick={()=>onCategory(item)} key={item}>{item}</button>)}</div><div className="news-grid news-archive">{news.map((item,index)=><NewsCard item={item} key={item.id} index={index}/>)}</div>{news.length===0&&<p className="empty-state">There are no items in this category at present.</p>}</section>
  </>;
}

function NewsCard({ item, index = 0 }) {
  return <article className="news-card"><a className={`news-art news-art-${index%4}`} href={`#news/${item.id}`} aria-label={`Read ${item.title}`}><span>{item.category.toUpperCase()}</span><i><ArrowUpRight size={19}/></i></a><div className="news-card-body"><span className="news-date"><CalendarDays size={13}/>{dateLabel(item.date)}</span><h3>{item.title}</h3><p>{item.excerpt}</p><a href={`#news/${item.id}`}>Read announcement <ArrowRight size={14}/></a></div></article>;
}

function NewsDetail({ item }) {
  if (!item) return <NotFound />;
  return <><div className="detail-top"><a href="#news"><ArrowLeft size={15}/> Force news</a><span>{item.category}</span></div><PageHero eyebrow={`${item.category.toUpperCase()} · ${dateLabel(item.date).toUpperCase()}`} title={item.title} intro={item.excerpt} variant="transport"/><article className="content-section article-body"><Eyebrow>FORCE UPDATE</Eyebrow><p>{item.body}</p><LinkButton href="#news" quiet>Return to force news</LinkButton></article></>;
}

function Recruitment({ profile }) {
  const professions = [
    ["Aircrew", "Serve in fighter, transport, helicopter, training and unmanned aviation roles."],
    ["Training & standards", "Develop personnel through instruction, conversion training and professional development."],
    ["Command & support", "Contribute to airspace control, safety, meteorology, security and administration."],
    ["Technology & development", "Support systems, operational information, communications and technical innovation."]
  ];
  return <>
    <PageHero eyebrow="RECRUITMENT" title="Serve with the Belgian Air Force." intro="Explore aircrew, training, command, technology and specialist-support opportunities." variant="helicopter" />
    <section className="content-section"><SectionTitle eyebrow="CAREER AREAS" title="Opportunities across the force" text="Contact the Recruitment Office for current roles and application requirements."/><div className="career-grid">{professions.map(([title,text],index)=><article className="career-card" key={title}><span className="career-index">0{index+1}</span><BriefcaseBusiness size={22}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="soft-section"><div className="section-wrap"><SectionTitle eyebrow="CONTACT RECRUITMENT" title="Enlist now" text="For application information, contact the Recruitment Office directly."/>{profile?.recruitmentEmail?<a className="recruitment-email" href={`mailto:${profile.recruitmentEmail}`}>{profile.recruitmentEmail}<ArrowUpRight size={15}/></a>:<p role="status">Recruitment contact details are unavailable.</p>}{profile?.website&&<p className="site-link-note">Force website: <a href={profile.website} target="_blank" rel="noreferrer">{profile.website}</a></p>}</div></section>
    <section className="content-section recruitment-note"><Shield size={22}/><div><Eyebrow>RECRUITMENT OFFICE</Eyebrow><h2>Questions about joining?</h2><p>{profile?.recruitmentEmail?<>Contact the recruitment team at <a href={`mailto:${profile.recruitmentEmail}`}>{profile.recruitmentEmail}</a>.</>:"Recruitment contact details are unavailable."}</p></div></section>
  </>;
}

function Media({ aircraft }) {
  const gallery = [
    ...mediaGallery,
    ...aircraft.map((item) => ({ ...aircraftImages[item.id], title: item.name, caption: `${item.category} aircraft · ${aircraftImages[item.id]?.license ?? ""}`, variant: item.image }))
  ];
  return <>
    <PageHero eyebrow="MEDIA CENTRE" title="Belgian Air Force in images." intro="Explore aircraft, insignia, recruitment material and official-flight imagery." variant="helicopter"/>
    <section className="content-section"><SectionTitle eyebrow="IMAGE GALLERY" title="Aircraft & insignia" text="Browse aircraft photographs and force imagery."/><div className="media-grid">{gallery.map((item,index)=><article className={`media-card ${index===3?"media-card-insignia":""}`} key={item.src}><div className={`media-art media-photo media-art-${index%3}`}>{item.source ? <ImageWithFallback src={item.src} alt={item.alt} variant={item.variant} className="gallery-image" fallbackClassName="gallery-image-fallback"/> : <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />}</div><div><Eyebrow>{item.caption}</Eyebrow><h3>{item.title}</h3>{item.source ? <a className="image-attribution" href={item.source} target="_blank" rel="noreferrer">Photo: {item.credit} · {item.license}</a> : item.credit && <span className="image-attribution">{item.credit} · {item.license}</span>}</div></article>)}</div></section>
    <section className="soft-section"><div className="section-wrap"><SectionTitle eyebrow="VIDEO GALLERY" title="Stories on screen" text="Video embeds can be added with captions and transcripts."/><div className="video-grid">{["A formation flight","A training session","Inside force support units"].map((title,index)=><article className="video-card" key={title}><div className={`video-placeholder video-${index}`}><CirclePlay size={43}/><span>VIDEO PLACEHOLDER</span></div><h3>{title}</h3><p>Captions and transcripts should accompany approved videos.</p></article>)}</div></div></section>
    <section className="content-section downloads"><div><Eyebrow>DOWNLOADS</Eyebrow><h2>Public media resources</h2><p>Wallpaper and media packs may be added following approval and rights checks.</p></div><a href="#media" aria-disabled="true" onClick={(event)=>event.preventDefault()} className="download-placeholder"><span><Award size={21}/><b>Wallpaper collection</b><small>PLACEHOLDER · NOT AVAILABLE</small></span><ArrowDown size={16}/></a></section>
  </>;
}

function Contact({ onSubmit, message, profile }) {
  return <>
    <PageHero eyebrow="CONTACT" title="Contact the Recruitment Office." intro="For public contact, recruitment information and application enquiries." variant="transport"/>
    <section className="content-section contact-layout"><div className="contact-copy"><Eyebrow>RECRUITMENT OFFICE</Eyebrow><h2>Information and enlistment.</h2><p>Contact the Belgian Air Force Recruitment Office using the published address.</p><div className="contact-block"><span><Mail size={18}/></span><div><Eyebrow>RECRUITMENT ENQUIRIES</Eyebrow>{profile?.recruitmentEmail?<a href={`mailto:${profile.recruitmentEmail}`}><b>{profile.recruitmentEmail}</b></a>:<b>Contact details unavailable</b>}</div></div><div className="contact-block"><span><Landmark size={18}/></span><div><Eyebrow>HEADQUARTERS</Eyebrow><b>{profile?.headquarters??"Force profile unavailable"}</b></div></div>{profile?.website&&<div className="contact-block"><span><ArrowUpRight size={18}/></span><div><Eyebrow>WEBSITE</Eyebrow><a href={profile.website} target="_blank" rel="noreferrer"><b>{profile.website}</b></a></div></div>}</div>
      <form className="contact-form" onSubmit={onSubmit}><Eyebrow>CONTACT FORM</Eyebrow><h2>Preview a message</h2><p>This form is not connected and will not transmit personal information.</p><label>Your name<input name="name" autoComplete="name" required/></label><label>Email address<input name="email" type="email" autoComplete="email" required/></label><label>Subject<select name="subject" defaultValue=""><option value="" disabled>Select a topic</option><option>Force information</option><option>Media enquiry</option><option>Website feedback</option></select></label><label>Message<textarea name="message" rows="4" required/></label><button className="solid-button" type="submit">Preview message <ArrowRight size={15}/></button>{message&&<p className="form-message" role="status">{message}</p>}</form>
    </section>
    <div className="editorial-note contact-caveat"><Shield size={17}/><p>This preview form does not transmit or store messages. Please use the published Recruitment Office email for genuine enquiries.</p></div>
  </>;
}

function Callout({ href, kicker, title, text, action }) {
  return <section className="callout"><div><Eyebrow>{kicker}</Eyebrow><h2>{title}</h2><p>{text}</p></div><LinkButton href={href}>{action}</LinkButton></section>;
}

function InfoCard({ icon: Icon, title, text }) {
  return <article className="info-card"><span className="info-icon"><Icon size={20}/></span><h3>{title}</h3><p>{text}</p></article>;
}

function iconFor(name) {
  return ({headquarters:Landmark,combat:Plane,transport:Ship,helicopter:Compass,training:Award,support:Wrench})[name] ?? Building2;
}

function NotFound() {
  return <section className="not-found"><Eyebrow>PAGE NOT FOUND</Eyebrow><h1>That page isn't here.</h1><p>Return to the public information homepage to continue browsing.</p><LinkButton href="#home">Go to homepage</LinkButton></section>;
}

function PolicyPage({ kind, data }) {
  const content = {
    accessibility: ["Accessibility", "Designed for clear, inclusive access.", "This website concept supports keyboard navigation, semantic headings, visible focus states, reduced reliance on colour alone and responsive layouts. Placeholder illustrations include accessible text descriptions. Before launch, test the final implementation against applicable accessibility requirements with assistive technologies and users."],
    privacy: ["Privacy notice", "Respect for your information.", "This demonstration site does not include analytics, advertising trackers or a functioning contact submission service. The mock contact form does not transmit data. A production website must publish a reviewed privacy notice that explains its actual data processing, retention and contact arrangements."],
    legal: ["Legal information", "About the Belgian Air Force.", `This website presents the Belgian Air Force and its organization, aircraft, ranks, units, missions and locations. ${data.force?.publicationNotice ?? ""} ${data.force?.rightsNotice ?? ""}`]
  }[kind];
  return <><PageHero eyebrow="SITE INFORMATION" title={content[0]} intro={content[1]} variant="transport"/><section className="content-section policy-copy"><Eyebrow>PUBLIC WEBSITE INFORMATION</Eyebrow><h2>{content[1]}</h2><p>{content[2]}</p><LinkButton href="#home" quiet>Return home</LinkButton></section></>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="identity" href="#home"><span className="identity-mark"><img src={belgianRoundel} alt="" /></span><span><strong>BELGIAN AIR FORCE</strong></span></a><p>Safeguarding airspace.<br/>Supporting national and allied operations.</p></div>
      <div className="footer-column"><Eyebrow>EXPLORE</Eyebrow><a href="#about">About</a><a href="#organization">Organization</a><a href="#aircraft">Aircraft</a><a href="#bases">Bases</a></div>
      <div className="footer-column"><Eyebrow>INFORMATION</Eyebrow><a href="#news">Force news</a><a href="#recruitment">Recruitment</a><a href="#media">Media</a><a href="#contact">Contact</a></div>
      <div className="footer-column"><Eyebrow>LEGAL & ACCESS</Eyebrow><a href="#accessibility">Accessibility</a><a href="#privacy">Privacy notice</a><a href="#legal">Legal information</a><a href="https://r3xicodes.github.io/baf.be/" target="_blank" rel="noreferrer">Force website</a></div>
    </div><div className="footer-bottom"><span>© Belgian Air Force</span><span>Belgian Air Force public information</span><a href="#home">Back to top ↑</a></div></footer>;
}
