import { useState } from "react";

const TITAN_LOGO = "https://i.ibb.co/q3c3CkLS/titan-logo.jpg";
const SIR_YASIR_PHOTO = "https://i.ibb.co/wF2jCyRH/WhatsApp-Image-2026-03-18-at-5-47-44-PM.jpg";

/* ── inline styles ── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#f4f6fa;color:#333}
:root{
  --blue:#1e40af;--border:#eaeaea;--muted:#666;--dark:#111;
  --r:8px;--rs:6px;
}

/* layout */
.portal{display:flex;min-height:100vh}

/* sidebar */
.sb{
  position:fixed;top:0;left:0;height:100vh;
  background:#fff;border-right:1px solid var(--border);
  display:flex;flex-direction:column;
  padding:20px 12px;z-index:100;
  transition:width .2s ease;overflow:hidden;
}
.sb.exp{width:220px}
.sb.col{width:68px;align-items:center;padding:20px 8px}

.toggle-btn{
  position:absolute;top:24px;right:-10px;
  background:#fff;border:1px solid var(--border);
  border-radius:50%;width:20px;height:20px;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.08);
}

.logo-wrap{margin-bottom:28px;display:flex;flex-direction:column;align-items:center;gap:4px;width:100%}
.logo-wrap img{height:52px;object-fit:contain}
.logo-name{font-size:16px;font-weight:800;color:var(--blue);letter-spacing:1px}

.nav{display:flex;flex-direction:column;gap:4px;flex:1;width:100%}
.ni{
  display:flex;align-items:center;gap:10px;
  padding:11px 12px;border-radius:var(--rs);
  color:#444;font-weight:600;font-size:13px;cursor:pointer;
}
.sb.col .ni{justify-content:center;padding:11px}
.ni:hover,.ni.act{background:#eff4ff;color:var(--blue)}
.ni svg{width:17px;height:17px;stroke:currentColor;fill:none;flex-shrink:0}

.sb-foot{padding-top:14px;border-top:1px solid var(--border);width:100%}
.user-card{
  display:flex;align-items:center;gap:8px;
  padding:8px;border-radius:var(--rs);cursor:pointer;
  position:relative;
}
.sb.exp .user-card{border:1px solid #e2e8f0}
.user-card img{width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid #fff;outline:1.5px solid #cbd5e1}
.user-info h4{font-size:12px;font-weight:700;color:var(--dark);white-space:nowrap}
.user-info p{font-size:11px;color:var(--muted)}

.popup{
  position:absolute;bottom:52px;left:0;right:0;
  background:#fff;border:1px solid var(--border);
  border-radius:var(--r);box-shadow:0 4px 16px rgba(0,0,0,.1);
  padding:6px;z-index:200;
}
.popup-item{display:flex;align-items:center;gap:8px;padding:9px 10px;font-size:13px;font-weight:600;border-radius:var(--rs);cursor:pointer}
.popup-item:hover{background:#f5f5f5}
.popup-item.logout{color:#e53e3e}
.popup-item.logout:hover{background:#fff5f5}
.popup-item svg{width:15px;height:15px;stroke:currentColor;fill:none}

/* main */
.main{
  flex:1;padding:28px 32px;
  transition:margin-left .2s ease;min-height:100vh;
}
.main.exp{margin-left:220px}
.main.col{margin-left:68px}

/* stat cards */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}
.stat{
  background:#fff;border:1px solid var(--border);
  border-radius:var(--r);padding:18px 16px;
  display:flex;justify-content:space-between;align-items:center;
}
.stat h3{font-size:26px;font-weight:700;color:var(--dark)}
.stat p{font-size:12px;color:var(--muted);margin-top:3px}
.stat-icon{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.gi{background:#f0fdf4}.bi{background:#eff6ff}.pi{background:#faf5ff}.ri{background:#fef2f2}.ai{background:#fffbeb}

/* breadcrumb */
.bc{font-size:13px;color:var(--muted);margin-bottom:16px}
.bc-link{color:var(--blue);cursor:pointer}
.bc-link:hover{text-decoration:underline}

/* tabs */
.tabs{display:flex;gap:18px;border-bottom:1px solid var(--border);margin-bottom:20px;overflow-x:auto}
.tab{background:none;border:none;padding:10px 0;font-size:14px;font-weight:600;color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;font-family:inherit}
.tab.act{color:var(--blue);border-bottom-color:var(--blue)}

/* table */
.tbl-wrap{background:#fff;border:1px solid var(--border);border-radius:var(--r);overflow:hidden}
.tbl-filter{display:flex;justify-content:space-between;gap:10px;padding:12px;border-bottom:1px solid var(--border);flex-wrap:wrap}
.tbl-search{padding:8px 12px;border:1px solid #ddd;border-radius:var(--rs);font-size:13px;width:100%;max-width:260px;font-family:inherit;outline:none}
.tbl-search:focus{border-color:var(--blue)}
.tbl-sel{padding:8px 12px;border:1px solid #ddd;border-radius:var(--rs);font-size:13px;background:#fff;font-family:inherit}
table{width:100%;border-collapse:collapse;text-align:left;min-width:600px}
thead th{padding:11px 12px;font-size:12px;color:var(--muted);border-bottom:1px solid var(--border);background:#fafafa;font-weight:600}
tbody td{padding:13px 12px;font-size:13px;border-bottom:1px solid #f5f5f5}
.cell-user{display:flex;align-items:center;gap:8px}
.av{width:30px;height:30px;border-radius:50%;object-fit:cover}
.badge-enrolled{color:#2563eb;border:1px solid #bfdbfe;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600}
.eye-btn{
  background:#f5f7fa;border:1px solid var(--border);
  border-radius:var(--rs);width:30px;height:30px;
  display:flex;align-items:center;justify-content:center;cursor:pointer;
  color:var(--muted);
}
.eye-btn:hover{color:var(--blue);border-color:var(--blue)}
.eye-btn svg{width:15px;height:15px;stroke:currentColor;fill:none}

/* pagination */
.pag{display:flex;justify-content:space-between;align-items:center;padding:12px;flex-wrap:wrap;gap:8px}
.pag-txt{font-size:12px;color:var(--muted)}
.pag-btns{display:flex;align-items:center;gap:5px}
.pag-btn{background:#fff;border:1px solid var(--border);padding:5px 11px;border-radius:var(--rs);font-size:12px;cursor:pointer;font-family:inherit}
.pag-btn:disabled{opacity:.5;cursor:not-allowed}
.pag-num{background:#fff;border:1px solid var(--border);width:28px;height:28px;border-radius:var(--rs);font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.pag-num.act{background:var(--blue);color:#fff;border-color:var(--blue)}
.pag-dots{color:var(--muted);font-size:12px;padding:0 2px}

/* attendance in course */
.att-sum{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;margin-bottom:16px}
.att-pill{padding:14px;border-radius:var(--rs);border:1px solid var(--border)}
.att-pill h5{font-size:20px;font-weight:700;margin-bottom:2px}
.att-pill p{font-size:12px;color:var(--muted)}
.gray-box{background:#f8fafc}
.green-box{background:#f0fdf4;color:#16a34a}
.red-box{background:#fef2f2;color:#dc2626}
.badge-present{background:#dcfce7;color:#16a34a;padding:3px 8px;font-size:11px;font-weight:700;border-radius:4px}
.badge-notmarked{background:#f5f5f5;color:#666;padding:3px 8px;font-size:11px;font-weight:700;border-radius:4px}
.badge-absent{background:#fef2f2;color:#dc2626;padding:3px 8px;font-size:11px;font-weight:700;border-radius:4px}
.badge-passed{background:#dcfce7;color:#16a34a;padding:3px 8px;font-size:11px;font-weight:700;border-radius:4px}

/* course cards */
.courses-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.course-card{background:#fff;border:1px solid var(--border);border-radius:var(--r);overflow:hidden;cursor:pointer;display:flex;flex-direction:column}
.card-head{padding:16px;display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
.card-head h4{font-size:15px;font-weight:700;line-height:1.4}
.card-sub{font-size:12px;color:var(--muted);display:block;margin-top:3px}
.batch-pill{font-size:11px;border:1px solid #ddd;padding:2px 7px;border-radius:4px;background:#fff;white-space:nowrap;flex-shrink:0}
.card-body{padding:14px;display:flex;flex-direction:column;gap:10px}
.loc{font-size:13px;color:var(--muted)}
.prog-label{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:4px}
.rail{height:6px;background:#eee;border-radius:3px;overflow:hidden}
.fill{height:100%}
.meta{border-top:1px solid #f5f5f5;padding-top:10px;font-size:12px;color:var(--muted);display:flex;flex-direction:column;gap:3px}

/* attendance overview for student */
.att-overview{background:#fff;border:1px solid var(--border);border-radius:var(--r);padding:18px;margin-bottom:18px}
.att-overview h3{font-size:15px;font-weight:700;margin-bottom:12px}
.ov-rail{height:8px;background:#eee;border-radius:4px;overflow:hidden}
.ov-fill-green{height:100%;background:#10b981}
.ov-fill-red{height:100%;background:#ef4444}
.att-warn{font-size:12px;font-weight:600;color:#d97706;margin-top:8px}
.att-good{font-size:12px;font-weight:600;color:#16a34a;margin-top:8px}

/* month table card */
.month-card{background:#fff;border:1px solid var(--border);border-radius:var(--r);padding:18px}
.month-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px}
.month-head h3{font-size:15px;font-weight:700}
.month-sel{padding:6px 10px;border:1px solid #ddd;border-radius:var(--rs);font-size:12px;background:#fff;font-family:inherit}

/* assignments table */
.ass-card{background:#fff;border:1px solid var(--border);border-radius:var(--r);overflow:hidden}
.ass-header{padding:18px 18px 0 18px}
.ass-header h3{font-size:15px;font-weight:700;margin-bottom:0}
.badge-approved{background:#dcfce7;color:#16a34a;padding:3px 8px;font-size:11px;font-weight:700;border-radius:4px}
.badge-notsubmitted{background:#fef9c3;color:#92400e;padding:3px 8px;font-size:11px;font-weight:700;border-radius:4px}
.badge-hackathon{background:#ede9fe;color:#6d28d9;padding:3px 8px;font-size:11px;font-weight:700;border-radius:4px;margin-left:6px}

/* quiz table */
.pct-green{color:#16a34a;font-weight:700}
.pct-yellow{color:#d97706;font-weight:700}

/* page title */
.page-title{font-size:22px;font-weight:700;margin-bottom:20px;color:var(--dark)}

/* date selector */
.date-select-row{display:flex;align-items:center;gap:10px;margin-bottom:18px;flex-wrap:wrap}
.date-select-row label{font-size:12px;font-weight:700;color:var(--muted)}
.date-input{padding:8px 12px;border:1px solid #ddd;border-radius:var(--rs);font-size:13px;font-family:inherit;outline:none}
.date-input:focus{border-color:var(--blue)}

/* workspace card */
.ws-card{background:#fff;border:1px solid var(--border);border-radius:var(--r);padding:24px}

/* progress */
.prog-card{background:#fff;border:1px solid var(--border);border-radius:var(--r);padding:18px}
.prog-hdr{display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:12px}
.acc-list{display:flex;flex-direction:column;gap:8px}
.acc-item{display:flex;justify-content:space-between;padding:13px;border:1px solid var(--border);border-radius:var(--rs);font-size:13px;font-weight:600}
.acc-item.done{border-left:4px solid #10b981;background:#fafdfb}
.acc-item.inprog{border-left:4px solid #3b82f6;background:#fafbfe}

/* schedule widget */
.sched-widget{background:#fff;border:1px solid var(--border);border-radius:var(--r);padding:14px}
.sched-title{font-size:13px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:6px}
.days-row{display:flex;gap:4px}
.day-pill{display:flex;flex-direction:column;align-items:center;font-size:11px;padding:6px 8px;border-radius:4px;background:#f9f9f9;flex:1;min-width:30px}
.day-pill.cur{background:#10b981;color:#fff;font-weight:700}
.day-pill.has{background:#e6fdf4;color:#10b981}
.day-pill span{font-weight:700;margin-top:2px}

/* attendance page (global) */
.att-top{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:20px}
.course-dd-wrap{position:relative;width:100%;max-width:380px}
.course-dd-trigger{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--border);border-radius:var(--rs);padding:10px 12px;cursor:pointer}
.course-dd-trigger strong{font-size:13px;display:block}
.course-dd-trigger p{margin:2px 0 0;font-size:11px;color:var(--muted)}
.cdd-list{position:absolute;top:105%;left:0;right:0;background:#fff;border:1px solid var(--border);border-radius:var(--rs);box-shadow:0 6px 18px rgba(0,0,0,.08);z-index:50;max-height:200px;overflow-y:auto}
.cdd-item{padding:10px 12px;font-size:12px;cursor:pointer;border-bottom:1px solid #f5f5f5}
.cdd-item:hover{background:#f5f7fa}
.att-stat-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:20px}
.att-stat{background:#fff;border:1px solid var(--border);border-radius:var(--r);padding:18px;display:flex;justify-content:space-between;align-items:center}
.att-stat h3{font-size:24px;font-weight:700}
.att-stat p{font-size:12px;color:var(--muted);margin-top:3px}
.no-records{padding:28px 0;text-align:center;color:var(--muted);font-size:13px;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}

/* overall toggle */
.toggle-grp{display:flex;background:#f1f1f1;border-radius:var(--rs);padding:3px}
.tgl-btn{background:none;border:none;padding:7px 14px;font-size:12px;font-weight:700;border-radius:5px;cursor:pointer;color:var(--muted);font-family:inherit}
.tgl-btn.act{background:#fff;color:var(--dark);box-shadow:0 1px 3px rgba(0,0,0,.1)}

/* profile */
.prof-cover{height:130px;border-radius:var(--r);background:linear-gradient(120deg,#1e40af,#4338ca);position:relative;margin-bottom:50px}
.prof-avatar{width:90px;height:90px;border-radius:50%;object-fit:cover;border:4px solid #fff;position:absolute;left:24px;bottom:-45px}
.prof-id{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;margin-bottom:24px}
.role-tag{display:inline-block;margin-top:6px;font-size:12px;font-weight:700;background:#eff6ff;color:var(--blue);padding:3px 10px;border-radius:5px}
.prof-btns{display:flex;gap:8px}
.btn-out{background:#fff;border:1px solid #c7c7c7;padding:9px 16px;border-radius:var(--rs);font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.btn-dark{background:#111;color:#fff;border:none;padding:9px 16px;border-radius:var(--rs);font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.prof-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}
.prof-card{background:#fff;border:1px solid var(--border);border-radius:var(--r);padding:18px}
.prof-card h3{font-size:15px;font-weight:700;margin-bottom:12px}
.info-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f5f5f5;font-size:13px;gap:10px}
.info-row:last-child{border:none}
.info-lbl{color:var(--muted)}
.info-val{font-weight:600;text-align:right;word-break:break-word}
.muted-italic{color:var(--muted);font-style:italic;font-size:13px}

/* calendar */
.cal-nav{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:16px}
.cal-nav h3{font-size:16px;font-weight:700;min-width:160px;text-align:center}
.cal-nav-btn{background:#fff;border:1px solid var(--border);width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer}
.cal-nav-btn svg{width:14px;height:14px;stroke:#555;fill:none}
.cal-wdays{display:grid;grid-template-columns:repeat(7,1fr)}
.cal-wday{text-align:center;font-size:12px;font-weight:700;color:var(--muted);padding:8px 0;border-bottom:1px solid var(--border)}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr)}
.cal-cell{border:1px solid #f3f3f3;min-height:100px;padding:6px;font-size:12px}
.cal-cell.empty{background:#fbfbfb}
.cal-cell.today{background:#f0f4ff}
.cal-num-row{display:flex;align-items:center;justify-content:space-between;font-weight:700;margin-bottom:4px}
.cal-today-num{background:#111;color:#fff;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px}
.cal-dot{width:6px;height:6px;border-radius:50%;background:#10b981}
.cal-events{display:flex;flex-direction:column;gap:3px}
.cal-ev-pill{font-size:9px;font-weight:700;color:#166534;padding:3px 5px;border-radius:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cal-card{background:#fff;border:1px solid var(--border);border-radius:var(--r);padding:16px;overflow-x:auto}

@media(max-width:900px){
  .courses-grid{grid-template-columns:1fr}
  .stats-row{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:600px){
  .main{padding:16px}
  .stats-row{grid-template-columns:1fr}
  .cal-cell{min-height:64px;padding:3px}
  .cal-ev-pill{font-size:8px}
}
`;

/* ── data ── */
const courses = [
  { id:"CRS-001", title:"Little Geniuses: Coding, Design & AI Fun Lab", type:"LAB | Male", campus:"TITAN Ghotki Campus (Ghotki)", batch:"Batch 1", progress:0, enrolled:4, schedule:"Sat 04:00 PM - 06:00 PM | Sun 04:00 PM - 06:00 PM", startedOn:"1 Jun 2026", bg:"#e6fdf4", accent:"#10b981" },
  { id:"CRS-002", title:"Little Geniuses: Coding, Design & AI Fun Lab", type:"LAB | Female", campus:"TITAN Ghotki Campus (Ghotki)", batch:"Batch 1", progress:0, enrolled:8, schedule:"Sat 12:00 PM - 02:00 PM | Sun 12:00 PM - 02:00 PM", startedOn:"1 Jun 2026", bg:"#eff2fe", accent:"#4f46e5" },
  { id:"CRS-003", title:"Little Geniuses: Coding, Design & AI Fun Lab", type:"LAB | Female", campus:"TITAN Ghotki Campus (Ghotki)", batch:"Batch 1", progress:0, enrolled:0, schedule:"Sat 10:00 AM - 12:00 PM | Sun 10:00 AM - 12:00 PM", startedOn:"1 Jun 2026", bg:"#f8fafc", accent:"#64748b" },
  { id:"CRS-004", title:"Modern Web Application Development", type:"LAB | Female", campus:"TITAN Ghotki Campus (Ghotki)", batch:"Batch 3", progress:25, enrolled:30, schedule:"Sat 08:00 AM - 10:00 AM | Sun 08:00 AM - 10:00 AM", startedOn:"1 Jan 2026", bg:"#ffebe9", accent:"#ef4444" },
  { id:"CRS-005", title:"Modern Web Application Development", type:"LAB | Male", campus:"TITAN Ghotki Campus (Ghotki)", batch:"Batch 3", progress:30, enrolled:28, schedule:"Sat 08:00 AM - 10:00 AM | Sun 08:00 AM - 10:00 AM", startedOn:"1 Jan 2026", bg:"#e3f2fd", accent:"#2563eb" },
  { id:"CRS-006", title:"Modern Web Application Development", type:"LAB | Male", campus:"Saylani TITAN Sukkur Campus (Sukkur)", batch:"Batch 1", progress:40, enrolled:32, schedule:"Mon 06:00 PM - 08:00 PM | Wed 06:00 PM - 08:00 PM | Fri 06:00 PM - 08:00 PM", startedOn:"1 Jan 2026", bg:"#ede9fe", accent:"#7c3aed" },
];

const studentNames = [
  ["Abdul Jabbar","477526","abjabbargopang@gmail.com"],
  ["Abdul rafay","469955","rafaygameti0345@gmail.com"],
  ["Abdul salam shaikh","475436","abdulsalam06699@gmail.com"],
  ["Abdullah Khan","470278","ak1636802@gmail.com"],
  ["Abdullah indhar","467789","indharabdullah30@gmail.com"],
  ["Ajmal","472623","dharejoajmal7@gmail.com"],
  ["Alyan Mehmood Shah Syed","468526","alyaly3036@gmail.com"],
  ["Ashraf Ali","472345","hamad@1947gmail.com"],
  ["Ayan Arain","525033","msayanarain846@gmail.com"],
  ["Faizan khan","468384","faizanlala712@gmail.com"],
];
const studentsData = studentNames.map(([name,code,email])=>({name,code,email,status:"ENROLLED",img:"https://img.jsdesign.hk/assets/img/6620ca9b6bda6fa0060cf476.jpg"}));

const TOTAL_RECORDS=106, PAGE_SIZE=10;
const totalPages=Math.ceil(TOTAL_RECORDS/PAGE_SIZE);

const attLog=[
  ["Mon, Jun 1, 2026","Present"],["Wed, Jun 3, 2026","Present"],["Fri, Jun 5, 2026","Present"],
  ["Mon, Jun 8, 2026","Present"],["Wed, Jun 10, 2026","Present"],["Fri, Jun 12, 2026","Present"],
  ["Mon, Jun 15, 2026","Present"],["Wed, Jun 17, 2026","Present"],
];

const assignments=[
  {title:"File managment vs dbms (theory)",due:"Fri, Jun 12, 2026",status:"Approved",hackathon:false},
  {title:"Galary_App_API_ASSIGNMENT",due:"Tue, Jun 2, 2026",status:"Approved",hackathon:false},
  {title:"React js Assignment Using Routing",due:"Thu, May 7, 2026",status:"Approved",hackathon:false},
  {title:"REACT JS ASSIGNMENT",due:"Wed, Apr 8, 2026",status:"Approved",hackathon:false},
  {title:"JAVASCRIPT DOM",due:"Sat, Mar 14, 2026",status:"Approved",hackathon:false},
  {title:"Web & App Hackathon",due:"Sat, Dec 27, 2025",status:"Approved",hackathon:true},
  {title:"java script assesment test",due:"Mon, Dec 1, 2025",status:"Not Submitted",hackathon:false},
  {title:"If else 8 questions java script",due:"Fri, Nov 28, 2025",status:"Approved",hackathon:false},
  {title:"Grand CSS Assignment oct 20",due:"Mon, Oct 27, 2025",status:"Approved",hackathon:false},
  {title:"Grid Assisnment oct 10",due:"Mon, Oct 27, 2025",status:"Approved",hackathon:false},
  {title:"Animation and transition oct 8",due:"Mon, Oct 27, 2025",status:"Approved",hackathon:false},
  {title:"Portfolio Card Assignment oct 6",due:"Mon, Oct 27, 2025",status:"Approved",hackathon:false},
  {title:"Tribute page sep 24",due:"Mon, Oct 27, 2025",status:"Approved",hackathon:false},
  {title:"Class Assignment sep 14",due:"Mon, Oct 27, 2025",status:"Approved",hackathon:false},
  {title:"HTML Assignmwnt 3 sep",due:"Mon, Oct 27, 2025",status:"Approved",hackathon:false,feedback:"very good work"},
  {title:"CSS Basics",due:"Mon, Oct 27, 2025",status:"Approved",hackathon:false},
];

const quizzes=[
  {title:"Javascript (Quiz-4)",score:33,total:40,pct:83,attempts:1,status:"Passed",date:"Mon, Jun 15, 2026"},
  {title:"Javascript (Quiz-3)",score:32,total:40,pct:80,attempts:1,status:"Passed",date:"Fri, May 22, 2026"},
  {title:"Javascript (Quiz-2)",score:32,total:40,pct:80,attempts:1,status:"Passed",date:"Fri, May 8, 2026"},
  {title:"Javascript (Quiz-1)",score:28,total:40,pct:70,attempts:1,status:"Passed",date:"Fri, May 8, 2026"},
  {title:"HTML Quiz",score:29,total:40,pct:73,attempts:1,status:"Passed",date:"Wed, Nov 12, 2025"},
  {title:"CSS Quiz",score:28,total:40,pct:70,attempts:1,status:"Passed",date:"Wed, Nov 12, 2025"},
];

const courseAttRows=[
  ["382282","Waqar Ali","PRESENT"],["463342","Qaimudin Khuwaja","NOT MARKED"],
  ["464127","Muhammad yaseen","PRESENT"],["465184","Muhammad Masood","PRESENT"],
  ["465921","Muhammad Bin Azam","NOT MARKED"],["466584","Shoaib Ahmed","PRESENT"],
  ["466824","Muhammad Hassan Memon","PRESENT"],["467551","Shahbaz Ali","PRESENT"],
  ["467643","Syed Hasnain Zaidi","PRESENT"],["467709","M.Mujtaba khan","PRESENT"],
  ["467789","Abdullah indhar","PRESENT"],["468384","Faizan khan","PRESENT"],
  ["468491","Tanveer","PRESENT"],["468526","Alyan Mehmood Shah Syed","PRESENT"],
];

const monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
const weekDays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function buildGrid(m,y){
  const first=new Date(y,m,1).getDay();
  const days=new Date(y,m+1,0).getDate();
  const cells=[];
  for(let i=0;i<first;i++) cells.push(null);
  for(let d=1;d<=days;d++) cells.push(d);
  return cells;
}

function getDayEvents(day,m,y){
  if(!day) return [];
  const wd=new Date(y,m,day).getDay();
  const ev=[];
  if(wd===1||wd===3||wd===5) ev.push({label:"MODERN WEB APPLICATION DEVELO...",color:"#dcfce7"});
  if(wd===0||wd===6){
    ev.push({label:"LITTLE GENIUSES: CODING, DESIGN...",color:"#dcfce7"});
    ev.push({label:"LITTLE GENIUSES: CODING, DESIGN...",color:"#dcfce7"});
  }
  return ev;
}

/* ── icons ── */
const Ico = {
  menu: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  dash: <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  cal: <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  att: <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  chevL: <polyline points="15 18 9 12 15 6"/>,
  chevR: <polyline points="9 18 15 12 9 6"/>,
  chevD: <polyline points="6 9 12 15 18 9"/>,
  user: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>,
  userCircle: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  check: <polyline points="20 6 9 17 4 12"/>,
  clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  x: <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
};
const I=({d,c,w=18,h=18})=><svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">{d}</svg>;

/* ─────────────────────────────────── */
export default function TitanPortal(){
  const [sidebar,setSidebar]=useState(true);
  const [menu,setMenu]=useState("dashboard");
  const [selCourse,setSelCourse]=useState(null);
  const [courseTab,setCourseTab]=useState("students");
  const [selStudent,setSelStudent]=useState(null);
  const [studentTab,setStudentTab]=useState("attendance");
  const [search,setSearch]=useState("");
  const [page,setPage]=useState(1);
  const [popupOpen,setPopupOpen]=useState(false);

  const [calMonth,setCalMonth]=useState(5);
  const [calYear,setCalYear]=useState(2026);

  const [attCourse,setAttCourse]=useState(0);
  const [attView,setAttView]=useState("overall");
  const [attDDOpen,setAttDDOpen]=useState(false);
  const [attDate,setAttDate]=useState("2026-06-17");

  const goTo=(m)=>{setMenu(m);setSelCourse(null);setSelStudent(null);setPopupOpen(false);}

  const filtered=studentsData.filter(s=>
    s.name.toLowerCase().includes(search.toLowerCase())||s.code.includes(search)
  );

  const changeMonth=(d)=>{
    let m=calMonth+d,y=calYear;
    if(m<0){m=11;y--} if(m>11){m=0;y++}
    setCalMonth(m);setCalYear(y);
  };

  const todayNum=22; // June 22 2026

  return(
    <>
      <style>{css}</style>
      <div className="portal">

        {/* SIDEBAR */}
        <aside className={`sb ${sidebar?"exp":"col"}`}>
          <div className="toggle-btn" onClick={()=>setSidebar(!sidebar)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5">
              {sidebar?<polyline points="15 18 9 12 15 6"/>:<polyline points="9 18 15 12 9 6"/>}
            </svg>
          </div>

          <div className="logo-wrap">
            <img src={TITAN_LOGO} alt="TITAN"/>
            {sidebar&&<span className="logo-name">TITAN</span>}
          </div>

          <nav className="nav">
            {[
              {id:"dashboard",label:"Dashboard",icon:Ico.dash},
              {id:"calendar",label:"Calendar",icon:Ico.cal},
              {id:"attendance",label:"Attendance",icon:Ico.att},
            ].map(n=>(
              <div key={n.id} className={`ni ${menu===n.id?"act":""}`} onClick={()=>goTo(n.id)}>
                {n.icon}
                {sidebar&&<span>{n.label}</span>}
              </div>
            ))}
          </nav>

          <div className="sb-foot">
            {popupOpen&&(
              <div className="popup">
                <div className="popup-item" onClick={()=>goTo("profile")}>
                  <I d={Ico.userCircle} c="#333"/>
                  <span>Profile</span>
                </div>
                <div className="popup-item logout">
                  <I d={Ico.logout} c="#e53e3e"/>
                  <span>Log out</span>
                </div>
              </div>
            )}
            <div className="user-card" onClick={()=>setPopupOpen(!popupOpen)}>
              <img src={SIR_YASIR_PHOTO} alt="avatar"/>
              {sidebar&&<div className="user-info"><h4>Sir Yasir Ali (SUK)</h4><p>Trainer</p></div>}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className={`main ${sidebar?"exp":"col"}`}>

          {/* ── PROFILE ── */}
          {menu==="profile"&&(
            <div>
              <h1 className="page-title">Profile</h1>
              <div className="prof-cover">
                <img src={SIR_YASIR_PHOTO} alt="" className="prof-avatar"/>
              </div>
              <div className="prof-id">
                <div>
                  <h2 style={{fontSize:22,fontWeight:700}}>Sir Yasir Ali (SUK)</h2>
                  <span className="role-tag">Trainer</span>
                </div>
                <div className="prof-btns">
                  <button className="btn-out">Edit Profile</button>
                  <button className="btn-dark">Download Card</button>
                </div>
              </div>
              <div className="prof-grid">
                <div className="prof-card">
                  <h3>Personal Information</h3>
                  {[["Email","yasirlashari131@gmail.com"],["Employee ID","15353"],["Hourly Rate","2500/hr"],["Phone","03033742231"]].map(([l,v])=>(
                    <div className="info-row" key={l}><span className="info-lbl">{l}</span><span className="info-val">{v}</span></div>
                  ))}
                </div>
                <div className="prof-card"><h3>Bio</h3><p className="muted-italic">No bio added yet.</p></div>
                <div className="prof-card"><h3>Social Links</h3><p className="muted-italic">No social links added yet.</p></div>
                <div className="prof-card"><h3>Security</h3><button className="btn-out">Update Password</button></div>
              </div>
            </div>
          )}

          {/* ── CALENDAR ── */}
          {menu==="calendar"&&(
            <div>
              <h1 className="page-title">Calendar</h1>
              <div className="cal-card">
                <div className="cal-nav">
                  <button className="cal-nav-btn" onClick={()=>changeMonth(-1)}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg></button>
                  <h3>{monthNames[calMonth]} {calYear}</h3>
                  <button className="cal-nav-btn" onClick={()=>changeMonth(1)}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></button>
                </div>
                <div className="cal-wdays">{weekDays.map(d=><div key={d} className="cal-wday">{d}</div>)}</div>
                <div className="cal-grid">
                  {buildGrid(calMonth,calYear).map((day,i)=>{
                    const isToday=day===todayNum&&calMonth===5&&calYear===2026;
                    const evs=getDayEvents(day,calMonth,calYear);
                    return(
                      <div key={i} className={`cal-cell ${!day?"empty":""} ${isToday?"today":""}`}>
                        {day&&(
                          <>
                            <div className="cal-num-row">
                              {isToday?<span className="cal-today-num">{day}</span>:<span>{day}</span>}
                              {evs.length>0&&<span className="cal-dot"/>}
                            </div>
                            <div className="cal-events">
                              {evs.slice(0,2).map((ev,j)=>(
                                <div key={j} className="cal-ev-pill" style={{background:ev.color}}>{ev.label}</div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── ATTENDANCE (global page) ── */}
          {menu==="attendance"&&(
            <div>
              <div className="att-top">
                <h1 className="page-title" style={{marginBottom:0}}>Attendance</h1>
                <div className="course-dd-wrap">
                  <div className="course-dd-trigger" onClick={()=>setAttDDOpen(!attDDOpen)}>
                    <I d={Ico.userCircle} c="#666"/>
                    <div>
                      <strong>{courses[attCourse].title}</strong>
                      <p>{courses[attCourse].schedule}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  {attDDOpen&&(
                    <div className="cdd-list">
                      {courses.map((c,idx)=>(
                        <div key={c.id} className="cdd-item" onClick={()=>{setAttCourse(idx);setAttDDOpen(false);}}>
                          {c.title} — {c.type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:16}}>
                <div>
                  <h3 style={{fontSize:16,fontWeight:700}}>Overall Stats</h3>
                  <p style={{fontSize:12,color:"var(--muted)",marginTop:2}}>20 May 2026 — 20 Jun 2026</p>
                </div>
                <div className="toggle-grp">
                  <button className={`tgl-btn ${attView==="overall"?"act":""}`} onClick={()=>setAttView("overall")}>Overall</button>
                  <button className={`tgl-btn ${attView==="slot"?"act":""}`} onClick={()=>setAttView("slot")}>This Slot</button>
                </div>
              </div>

              <div className="att-stat-cards">
                {[["0","Total Classes","#3b82f6",Ico.cal,"bi"],["0m","Total Time Served","#10b981",Ico.clock,"gi"],["0m","Total Late Time","#ef4444",Ico.clock,"ri"]].map(([v,l,c,d,cls])=>(
                  <div className="att-stat" key={l}>
                    <div><h3>{v}</h3><p>{l}</p></div>
                    <div className={`stat-icon ${cls}`}><I d={d} c={c}/></div>
                  </div>
                ))}
              </div>

              <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:20}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:16}}>
                  <div>
                    <h3 style={{fontSize:16,fontWeight:700}}>Attendance Records</h3>
                    <p style={{fontSize:12,color:"var(--muted)",marginTop:2}}>Course: {courses[attCourse].title}</p>
                  </div>
                  <div style={{display:"flex",alignItems:"flex-end",gap:8}}>
                    <div style={{display:"flex",flexDirection:"column",gap:3}}>
                      <label style={{fontSize:10,fontWeight:700,color:"var(--muted)"}}>START DATE</label>
                      <input type="text" defaultValue="May 20" style={{padding:"7px 10px",border:"1px solid #ddd",borderRadius:"var(--rs)",fontSize:12,width:90}}/>
                    </div>
                    <span style={{color:"var(--muted)",paddingBottom:8}}>→</span>
                    <div style={{display:"flex",flexDirection:"column",gap:3}}>
                      <label style={{fontSize:10,fontWeight:700,color:"var(--muted)"}}>END DATE</label>
                      <input type="text" defaultValue="Jun 20" style={{padding:"7px 10px",border:"1px solid #ddd",borderRadius:"var(--rs)",fontSize:12,width:90}}/>
                    </div>
                  </div>
                </div>
                <div className="no-records">No attendance records found.</div>
                <div className="pag">
                  <span className="pag-txt">Showing 1-0 of 0 records</span>
                  <div className="pag-btns">
                    <button className="pag-btn" disabled>Previous</button>
                    <button className="pag-num act">1</button>
                    <button className="pag-btn" disabled>Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── DASHBOARD ── */}
          {menu==="dashboard"&&(
            <>
              {!selCourse?(
                <>
                  <h1 className="page-title">Dashboard</h1>

                  <div className="stats-row">
                    <div className="stat">
                      <div><h3>6</h3><p>Active Courses</p></div>
                      <div className="stat-icon gi"><I d={Ico.book} c="#10b981"/></div>
                    </div>
                    <div className="stat">
                      <div><h3>102</h3><p>Enrolled Students</p></div>
                      <div className="stat-icon bi"><I d={Ico.userCircle} c="#3b82f6"/></div>
                    </div>
                    <div className="stat">
                      <div><h3>0</h3><p>Total Assignments</p></div>
                      <div className="stat-icon pi"><I d={Ico.att} c="#8b5cf6"/></div>
                    </div>
                    <div className="sched-widget">
                      <div className="sched-title">
                        <I d={Ico.cal} c="#666" w={14} h={14}/>
                        Teaching Schedule
                      </div>
                      <div className="days-row">
                        {[["Sun",14,"has"],["Mon",15,"has"],["Tue",16,""],["Wed",17,"cur"],["Thu",18,""],["Fri",19,"has"],["Sat",20,"has"]].map(([d,n,cls])=>(
                          <div key={d} className={`day-pill ${cls}`}>{d}<span>{n}</span></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h3 style={{fontSize:16,fontWeight:700,marginBottom:16}}>Active Courses</h3>
                  <div className="courses-grid">
                    {courses.map(c=>(
                      <div key={c.id} className="course-card" onClick={()=>{setSelCourse(c);setCourseTab("students");setPage(1);}}>
                        <div className="card-head" style={{background:c.bg}}>
                          <div>
                            <h4>{c.title}</h4>
                            <span className="card-sub">{c.type}</span>
                          </div>
                          <span className="batch-pill">{c.batch}</span>
                        </div>
                        <div className="card-body">
                          <p className="loc">{c.campus}</p>
                          <div>
                            <div className="prog-label"><span>Progress</span><span>{c.progress}% Completed</span></div>
                            <div className="rail"><div className="fill" style={{width:`${c.progress}%`,background:c.accent}}/></div>
                          </div>
                          <div className="meta">
                            <div>Enrolled: {c.enrolled} students</div>
                            <div>Schedule: {c.schedule}</div>
                            <div>Started On: {c.startedOn}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ):selStudent?(
                /* ── STUDENT DETAIL ── */
                <div className="ws-card">
                  <div className="bc">
                    <span className="bc-link" onClick={()=>{setSelCourse(null);setSelStudent(null);}}>Dashboard</span>
                    {" > "}
                    <span className="bc-link" onClick={()=>setSelStudent(null)}>{selCourse.title}</span>
                    {" > "}
                    <span>{selStudent.name}</span>
                  </div>

                  <div className="tabs">
                    {["attendance","assignments","quizzes"].map(t=>(
                      <button key={t} className={`tab ${studentTab===t?"act":""}`} onClick={()=>setStudentTab(t)}>
                        {t.charAt(0).toUpperCase()+t.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* attendance tab */}
                  {studentTab==="attendance"&&(
                    <>
                      <div className="att-stat-cards" style={{marginBottom:18}}>
                        {[["125","Total Classes","#3b82f6",Ico.cal,"bi"],["111","Present","#10b981",Ico.check,"gi"],["5","Leave","#d97706",Ico.x,"ai"],["9","Absent","#ef4444",Ico.x,"ri"]].map(([v,l,c,d,cls])=>(
                          <div className="att-stat" key={l}>
                            <div><h3>{v}</h3><p>{l}</p></div>
                            <div className={`stat-icon ${cls}`}><I d={d} c={c}/></div>
                          </div>
                        ))}
                      </div>

                      <div className="att-overview">
                        <h3>Attendance Overview</h3>
                        <div className="ov-rail"><div className="ov-fill-green" style={{width:"89%"}}/></div>
                        <p className="att-good">Your attendance is good. Keep it up!</p>
                      </div>

                      <div className="month-card">
                        <div className="month-head">
                          <h3>Attendance: Jun 2026</h3>
                          <select className="month-sel" defaultValue="Jun 2026"><option>Jun 2026</option></select>
                        </div>
                        <div className="tbl-wrap">
                          <table>
                            <thead><tr><th>Date</th><th>Status</th></tr></thead>
                            <tbody>
                              {attLog.map((r,i)=>(
                                <tr key={i}>
                                  <td>{r[0]}</td>
                                  <td>
                                    <span className={r[1]==="Present"?"badge-present":"badge-absent"}>
                                      {r[1]==="Present"?"✓ Present":"✗ Absent"}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}

                  {/* assignments tab */}
                  {studentTab==="assignments"&&(
                    <>
                      <div className="att-stat-cards" style={{marginBottom:18}}>
                        {[["16","Total Assignments","#3b82f6",Ico.book,"bi"],["16","Submitted","#10b981",Ico.check,"gi"],["16","Approved","#10b981",Ico.check,"gi"],["0","Not Approved","#ef4444",Ico.x,"ri"]].map(([v,l,c,d,cls])=>(
                          <div className="att-stat" key={l}>
                            <div><h3>{v}</h3><p>{l}</p></div>
                            <div className={`stat-icon ${cls}`}><I d={d} c={c}/></div>
                          </div>
                        ))}
                      </div>
                      <div className="tbl-wrap">
                        <table>
                          <thead>
                            <tr><th>#</th><th>Title</th><th>Due Date</th><th>Submission</th><th>Feedback</th></tr>
                          </thead>
                          <tbody>
                            {assignments.map((a,i)=>(
                              <tr key={i}>
                                <td>{i+1}</td>
                                <td>
                                  {a.title}
                                  {a.hackathon&&<span className="badge-hackathon">Hackathon</span>}
                                </td>
                                <td>{a.due}</td>
                                <td>
                                  {a.status==="Approved"
                                    ?<span className="badge-approved">Approved</span>
                                    :<span className="badge-notsubmitted">Not Submitted</span>}
                                </td>
                                <td style={{color:"var(--muted)",fontSize:13}}>{a.feedback||"—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* quizzes tab */}
                  {studentTab==="quizzes"&&(
                    <div>
                      <h3 style={{fontSize:16,fontWeight:700,marginBottom:16}}>Quiz Results</h3>
                      <div className="tbl-wrap">
                        <table>
                          <thead>
                            <tr><th>#</th><th>Quiz Title</th><th>Score</th><th>Total Questions</th><th>Percentage</th><th>Attempts</th><th>Status</th><th>Date</th></tr>
                          </thead>
                          <tbody>
                            {quizzes.map((q,i)=>(
                              <tr key={i}>
                                <td>{i+1}</td>
                                <td>{q.title}</td>
                                <td>{q.score}</td>
                                <td>{q.total}</td>
                                <td><span className="pct-green">{q.pct}%</span></td>
                                <td>{q.attempts}</td>
                                <td><span className="badge-passed">Passed</span></td>
                                <td>{q.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ):(
                /* ── COURSE DETAIL ── */
                <div className="ws-card">
                  <div className="bc">
                    <span className="bc-link" onClick={()=>setSelCourse(null)}>Dashboard</span>
                    {" > "}
                    <span>{selCourse.title}</span>
                  </div>

                  <h2 style={{fontSize:20,fontWeight:700,marginBottom:16}}>{selCourse.title}</h2>

                  <div className="tabs">
                    {["students","attendance","assignments","quizzes","progress"].map(t=>(
                      <button key={t} className={`tab ${courseTab===t?"act":""}`} onClick={()=>setCourseTab(t)}>
                        {t==="progress"?"Course Progress":t.charAt(0).toUpperCase()+t.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* students */}
                  {courseTab==="students"&&(
                    <div className="tbl-wrap">
                      <div className="tbl-filter">
                        <input className="tbl-search" placeholder="Search students..." value={search} onChange={e=>setSearch(e.target.value)}/>
                        <select className="tbl-sel"><option>All</option><option>Enrolled</option><option>Pending</option></select>
                      </div>
                      <table>
                        <thead><tr><th>Name</th><th>Roll Number</th><th>Email</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                          {filtered.map((s,i)=>(
                            <tr key={i}>
                              <td><div className="cell-user"><img src={s.img} alt="" className="av"/>{s.name}</div></td>
                              <td>{s.code}</td>
                              <td>{s.email}</td>
                              <td><span className="badge-enrolled">{s.status}</span></td>
                              <td>
                                <button className="eye-btn" onClick={()=>{setSelStudent(s);setStudentTab("attendance");}}>
                                  <I d={Ico.eye} c="currentColor"/>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="pag">
                        <span className="pag-txt">Showing {(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE,TOTAL_RECORDS)} of {TOTAL_RECORDS} records</span>
                        <div className="pag-btns">
                          <button className="pag-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Previous</button>
                          {[1,2].map(p=><button key={p} className={`pag-num ${page===p?"act":""}`} onClick={()=>setPage(p)}>{p}</button>)}
                          <span className="pag-dots">...</span>
                          <button className={`pag-num ${page===totalPages?"act":""}`} onClick={()=>setPage(totalPages)}>{totalPages}</button>
                          <button className="pag-btn" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* course attendance tab */}
                  {courseTab==="attendance"&&(
                    <>
                      {/* Date picker */}
                      <div className="date-select-row">
                        <label>SELECT DATE</label>
                        <input type="date" value={attDate} onChange={e=>setAttDate(e.target.value)} className="date-input"/>
                      </div>

                      <div className="att-sum">
                        <div className="att-pill gray-box"><h5>37</h5><p>Total Students</p></div>
                        <div className="att-pill green-box"><h5>30</h5><p>Present</p></div>
                        <div className="att-pill" style={{background:"#fffbeb",color:"#92400e"}}><h5>0</h5><p>Leave</p></div>
                        <div className="att-pill red-box"><h5>7</h5><p>Absent</p></div>
                      </div>

                      <div className="tbl-wrap">
                        <table>
                          <thead>
                            <tr>
                              <th colSpan={3} style={{textAlign:"center",padding:"12px",fontWeight:700,fontSize:14}}>
                                Attendance for {new Date(attDate+"T00:00:00").toDateString().replace(/^\S+ /,"")+" "+new Date(attDate+"T00:00:00").getFullYear()}
                              </th>
                            </tr>
                            <tr><th>Roll #</th><th>Full Name</th><th>Status</th></tr>
                          </thead>
                          <tbody>
                            {courseAttRows.map((r,i)=>(
                              <tr key={i}>
                                <td>{r[0]}</td>
                                <td>{r[1]}</td>
                                <td>
                                  <span className={r[2]==="PRESENT"?"badge-present":r[2]==="NOT MARKED"?"badge-notmarked":"badge-absent"}>
                                    {r[2]}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {/* assignments */}
                  {courseTab==="assignments"&&(
                    <div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                        <h3 style={{fontSize:15,fontWeight:700}}>Assignments</h3>
                        <button style={{display:"flex",alignItems:"center",gap:6,background:"var(--blue)",color:"#fff",border:"none",padding:"9px 14px",borderRadius:"var(--rs)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                          <I d={Ico.plus} c="#fff" w={14} h={14}/> New Assignment
                        </button>
                      </div>
                      <p style={{color:"var(--muted)",fontSize:13}}>No assignments posted yet for this selection.</p>
                    </div>
                  )}

                  {/* quizzes */}
                  {courseTab==="quizzes"&&(
                    <div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                        <h3 style={{fontSize:15,fontWeight:700}}>Quizzes</h3>
                        <button style={{display:"flex",alignItems:"center",gap:6,background:"var(--blue)",color:"#fff",border:"none",padding:"9px 14px",borderRadius:"var(--rs)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                          <I d={Ico.plus} c="#fff" w={14} h={14}/> New Quiz
                        </button>
                      </div>
                      <p style={{color:"var(--muted)",fontSize:13}}>No active quizzes configured for this laboratory module.</p>
                    </div>
                  )}

                  {/* progress */}
                  {courseTab==="progress"&&(
                    <div className="prog-card">
                      <div className="prog-hdr"><span>Module Performance Progress</span><strong>80% Completed</strong></div>
                      <div className="rail" style={{marginBottom:16}}><div className="fill" style={{width:"80%",background:"#3b82f6"}}/></div>
                      <div className="acc-list">
                        <div className="acc-item done"><span>Web Designing Fun Fundamentals</span><span>100%</span></div>
                        <div className="acc-item done"><span>AI Fun Labs & Design Logic</span><span>100%</span></div>
                        <div className="acc-item inprog"><span>Basic Block Coding Labs</span><span>24%</span></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </main>
      </div>
    </>
  );
}