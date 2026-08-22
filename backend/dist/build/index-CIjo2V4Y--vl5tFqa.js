import{r as a,a5 as Ue,a6 as Ve,j as r,a7 as V,a8 as A,a9 as m,aa as Je,ab as qe,ac as Xe,ad as Ye,ae as v,af as P,ag as Ze,h as s,ah as _e,ai as Qe,aj as er,ak as L,al as ae,am as rr,an as ge,ao as tr,ap as he,aq as nr,ar as or,as as fe}from"./strapi-DpeDZP07.js";import{u as sr,a as le,K as ir,P as ar,D as lr,c as cr,b as dr,C as me}from"./core.esm-CGTe9jaL.js";import{s as pr,a as ce,S as te,v as ne,u as oe}from"./sortable.esm-BFs2t94N.js";const ur=a.createContext({toggleNotification:()=>{}});/**
* @preserve
* @description Returns an object to interact with the notification
* system. The callbacks are wrapped in `useCallback` for a stable
* identity.
*
* @example
* ```tsx
* import { useNotification } from '@strapi/strapi/admin';
*
* const MyComponent = () => {
*  const { toggleNotification } = useNotification();
*
*  return <button onClick={() => toggleNotification({ message: 'Hello world!' })}>Click me</button>;
*/const xr=()=>a.useContext(ur),je=({children:e,...t})=>r.jsx(V,{...t,children:e}),gr=({children:e="Loading content."})=>r.jsx(je,{height:"100dvh","aria-busy":!0,children:r.jsx(m,{alignItems:"center",height:"100%",justifyContent:"center",children:r.jsx(Je,{children:e})})}),hr=e=>{const{formatMessage:t}=qe();return r.jsx(je,{height:"100%",children:r.jsx(m,{alignItems:"center",height:"100%",justifyContent:"center",children:r.jsx(Xe,{icon:r.jsx(Ye,{width:"16rem"}),content:t({id:"anErrorOccurred",defaultMessage:"Whoops! Something went wrong. Please, try again."}),...e})})})},de={Error:hr,Loading:gr},fr=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
`,mr=s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({theme:e})=>e.colors.primary100};
  border-radius: 8px;
`,jr=s.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 32px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.neutral200};
`,pe=s.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-bottom: 2px solid ${({$active:e,theme:t})=>e?t.colors.primary600:"transparent"};
  background: transparent;
  color: ${({$active:e,theme:t})=>e?t.colors.primary600:t.colors.neutral500};
  font-weight: ${({$active:e})=>e?"700":"500"};
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({theme:e})=>e.colors.primary600};
  }
`,Q=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 24px;
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  background: ${({theme:e})=>e.colors.neutral0};
  min-width: 90px;
`,ee=s.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.neutral800};
`,re=s.span`
  font-size: 1.1rem;
  color: ${({theme:e})=>e.colors.neutral500};
  margin-bottom: 2px;
`,br=s.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
  padding: 32px;
  background: ${({theme:e})=>e.colors.neutral100};
  min-height: calc(100vh - 180px);
  align-items: start;
`,yr=s.div`
  display: flex;
  flex-direction: column;
  background: ${({theme:e})=>e.colors.neutral0};
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: 4px;
  box-shadow: ${({theme:e})=>e.shadows.filterShadow};
  max-height: calc(100vh - 240px);
  position: sticky;
  top: 32px;
`,vr=s.div`
  display: flex;
  flex-direction: column;
  background: ${({theme:e})=>e.colors.neutral100};
  padding: 24px 32px;
`,be=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px 16px 20px;
`,$r=s.span`
  background: ${({theme:e})=>e.colors.neutral150};
  color: ${({theme:e})=>e.colors.neutral600};
  font-size: 1.1rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
`,wr=s.div`
  display: flex;
  gap: 8px;
  padding: 0 20px 16px;
`,Cr=s.div`
  position: relative;
  flex: 1;
`,kr=s.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({theme:e})=>e.colors.neutral500};
  display: flex;
  align-items: center;
  svg { width: 14px; height: 14px; }
`,Sr=s.input`
  width: 100%;
  padding: 10px 12px 10px 34px;
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: 4px;
  font-size: 1.3rem;
  background: ${({theme:e})=>e.colors.neutral0};
  color: ${({theme:e})=>e.colors.neutral800};

  &::placeholder { color: ${({theme:e})=>e.colors.neutral400}; }
  &:focus { outline: none; border-color: ${({theme:e})=>e.colors.primary600}; }
`;s.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({theme:e})=>e.colors.neutral0};
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: 4px;
  color: ${({theme:e})=>e.colors.neutral500};
  cursor: pointer;
  svg { width: 14px; height: 14px; }
  &:hover { background: ${({theme:e})=>e.colors.neutral100}; }
`;const Ir=s.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${({theme:e})=>e.colors.neutral400};
  display: flex;
  align-items: center;
  padding: 2px;
  svg { width: 10px; height: 10px; }
  &:hover { color: ${({theme:e})=>e.colors.neutral600}; }
`,Tr=s.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
`,Gr=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
  transition: opacity 0.15s ease;
`,J=s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({$active:e,$assigned:t,theme:o})=>t?o.colors.neutral400:e?o.colors.primary600:o.colors.primary500};
  svg { width: 16px; height: 16px; }
`,Nr=s.div`
  color: ${({theme:e})=>e.colors.success500};
  svg { width: 16px; height: 16px; }
`,se=s.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: grab;
  color: ${({theme:e})=>e.colors.neutral400};
  padding: 0;
  &:hover { color: ${({theme:e})=>e.colors.neutral600}; }
  &:active { cursor: grabbing; }
  svg { width: 12px; height: 12px; }
`,Er=s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:e})=>e.colors.neutral300};
  svg { width: 12px; height: 12px; }
`,Mr=s.div`
  padding: 20px;
`,Rr=s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({theme:e})=>e.colors.neutral100};
  border-radius: 4px;
  padding: 12px;
`,Lr=s.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border: 1px solid ${({theme:e})=>e.colors.neutral500};
  border-radius: 50%;
  font-size: 10px;
  color: ${({theme:e})=>e.colors.neutral500};
  font-weight: bold;
`,Dr=s.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Br=s.div`
  background: ${({theme:e})=>e.colors.neutral0};
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: 8px;
`,Wr=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: ${({theme:e})=>e.colors.neutral0};
  border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
  border-radius: 7px 7px 0 0;
`,zr=s.span`
  display: flex;
  align-items: center;
  color: ${({theme:e})=>e.colors.primary500};
  svg { width: 16px; height: 16px; }
`,Or=s.span`
  font-size: 1.1rem;
  background: ${({theme:e})=>e.colors.neutral200};
  color: ${({theme:e})=>e.colors.neutral600};
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
`,Ar=s.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({theme:e})=>e.colors.neutral500};
  padding: 4px;
  border-radius: 4px;
  transition: transform 0.2s ease;
  transform: ${({$collapsed:e})=>e?"rotate(-90deg)":"rotate(0)"};
  &:hover { background: ${({theme:e})=>e.colors.neutral150}; }
`,Pr=s.div`
  position: relative;
`,Hr=s.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 999;
  min-width: 140px;
  background: ${({theme:e})=>e.colors.neutral0};
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`,ue=s.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: transparent;
  font-size: 1.3rem;
  cursor: pointer;
  color: ${({$danger:e,theme:t})=>e?t.colors.danger600:t.colors.neutral800};
  text-align: left;
  &:hover { background: ${({$danger:e,theme:t})=>e?t.colors.danger100:t.colors.neutral100}; }
  svg { width: 14px; height: 14px; }
`,Kr=s.div`
  padding: 8px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Fr=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  background: ${({theme:e})=>e.colors.neutral0};
  border: 1px dashed ${({theme:e})=>e.colors.neutral200};
  border-radius: 4px;
  margin-top: 8px;
  color: ${({theme:e})=>e.colors.neutral500};
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 12px;
    path {
      fill: ${({theme:e})=>e.colors.neutral400};
    }
  }
`,Ur=s.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({theme:e})=>e.colors.neutral600};
  margin-bottom: 4px;
`,Vr=s.div`
  font-size: 1.1rem;
  color: ${({theme:e})=>e.colors.neutral500};
`,Jr=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
  background: ${({theme:e})=>e.colors.neutral0};
  &:last-child { border-bottom: none; }
  &:hover { background: ${({theme:e})=>e.colors.neutral100}; }
`,qr=s.span`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${({theme:e})=>e.colors.warning100};
  color: ${({theme:e})=>e.colors.warning600};
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.warning200};
`,Xr=s.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({theme:e})=>e.colors.warning600};
`,Yr=s.div`
  margin: 0 32px;
  padding: 12px 16px;
  background: ${({theme:e})=>e.colors.danger100};
  border: 1px solid ${({theme:e})=>e.colors.danger200};
  border-radius: 4px;
  color: ${({theme:e})=>e.colors.danger700};
  font-size: 1.3rem;
`,Zr=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: ${({theme:e})=>e.colors.neutral0};
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.neutral800};
  svg { width: 14px; height: 14px; color: ${({theme:e})=>e.colors.neutral400}; }
`,_r=s.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: 4px;
  font-size: 1.4rem;
  color: ${({theme:e})=>e.colors.neutral800};
  background: ${({theme:e})=>e.colors.neutral0};

  &::placeholder { color: ${({theme:e})=>e.colors.neutral400}; }
  &:focus { outline: none; border-color: ${({theme:e})=>e.colors.primary600}; box-shadow: 0 0 0 2px ${({theme:e})=>e.colors.primary100}; }
`,Qr=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  background: ${({theme:e})=>e.colors.neutral0};
  border: 1px dashed ${({theme:e})=>e.colors.neutral300};
  border-radius: 8px;
  color: ${({theme:e})=>e.colors.neutral500};
`,et=s.div`
  position: relative;
  width: 52px;
  height: 28px;
  border-radius: 14px;
  background: ${({$checked:e,theme:t})=>e?t.colors.primary600:t.colors.neutral150};
  box-shadow: ${({$checked:e,theme:t})=>e?`inset 2px 2px 4px ${t.colors.primary700}, inset -2px -2px 4px ${t.colors.primary500}`:`inset 2px 2px 4px ${t.colors.neutral200}, inset -2px -2px 4px ${t.colors.neutral100}`};
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
`,rt=s.div`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({theme:e})=>e.colors.neutral0};
  box-shadow: 2px 2px 4px ${({theme:e})=>e.colors.neutral200},
              -1px -1px 2px ${({theme:e})=>e.colors.neutral0};
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  transform: ${({$checked:e})=>e?"translateX(24px)":"translateX(0)"};
`,ye=()=>r.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[r.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}),r.jsx("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),r.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]}),ve=()=>r.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[r.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"}),r.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),r.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),r.jsx("polyline",{points:"10 9 9 9 8 9"})]}),$e=({kind:e})=>e==="collectionType"?r.jsx(ye,{}):r.jsx(ve,{});function tt(){return r.jsx("svg",{width:"14",height:"8",viewBox:"0 0 14 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M14 .889a.86.86 0 0 1-.26.625l-6 5.778a.92.92 0 0 1-.65.264.92.92 0 0 1-.65-.264l-6-5.778A.86.86 0 0 1 .18.89c0-.24.1-.451.26-.625A.92.92 0 0 1 1.09 0a.92.92 0 0 1 .65.264L7.09 5.42 12.44.264A.92.92 0 0 1 13.09 0a.92.92 0 0 1 .65.264.86.86 0 0 1 .26.625Z",fill:"currentColor"})})}const nt=()=>r.jsx(ge,{style:{width:24,height:24,color:"#4945ff"}}),we=()=>r.jsx(ge,{style:{width:18,height:18,color:"#4945ff"}}),ot=()=>r.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("path",{d:"M5 9H19L17.5 19H6.5L5 9Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",strokeDasharray:"4 4"}),r.jsx("path",{d:"M8 9V6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",strokeDasharray:"4 4"})]});function st({hasChanges:e,saving:t,onReset:o,onSave:d}){return r.jsxs(fr,{children:[r.jsx("div",{children:r.jsxs(m,{alignItems:"center",gap:3,children:[r.jsx(mr,{children:r.jsx(nt,{})}),r.jsxs(m,{direction:"column",alignItems:"flex-start",gap:1,children:[r.jsx(v,{variant:"alpha",textColor:"neutral800",children:"Content Manager Organizer"}),r.jsx(v,{variant:"epsilon",textColor:"neutral500",children:"Organize Collection Types and Single Types into custom sidebar groups."})]})]})}),r.jsxs(m,{gap:3,alignItems:"center",children:[e&&r.jsxs(qr,{children:[r.jsx(Xr,{})," Unsaved changes"]}),r.jsx(P,{variant:"tertiary",onClick:o,disabled:!e,children:"Reset"}),r.jsx(P,{onClick:d,loading:t,disabled:!e,children:"Save Configuration"})]})]})}function it({activeTab:e,setActiveTab:t,sortBy:o,onChangeSortBy:d,stats:x}){const l=o==="custom";return r.jsxs(jr,{children:[r.jsxs(m,{gap:4,children:[r.jsxs(pe,{$active:e==="collectionType",onClick:()=>t("collectionType"),children:[r.jsx(J,{$active:e==="collectionType",children:r.jsx(ye,{})}),"Collection Types"]}),r.jsxs(pe,{$active:e==="singleType",onClick:()=>t("singleType"),children:[r.jsx(J,{$active:e==="singleType",children:r.jsx(ve,{})}),"Single Types"]})]}),r.jsxs(m,{gap:5,children:[r.jsxs(m,{gap:3,alignItems:"center",style:{paddingRight:"16px",borderRight:"1px solid #eaeaef"},children:[r.jsx(v,{variant:"sigma",textColor:"neutral600",children:"SORT ORDER"}),r.jsxs(m,{gap:2,alignItems:"center",children:[r.jsx(v,{variant:"pi",textColor:l?"neutral500":"primary600",fontWeight:"bold",children:"Alphabetical"}),r.jsx(et,{$checked:l,onClick:()=>d(l?"alphabetical":"custom"),children:r.jsx(rt,{$checked:l})}),r.jsx(v,{variant:"pi",textColor:l?"primary600":"neutral500",fontWeight:"bold",children:"Custom Order"})]})]}),r.jsxs(m,{gap:3,children:[r.jsxs(Q,{children:[r.jsx(re,{children:"Total"}),r.jsx(ee,{children:x.total})]}),r.jsxs(Q,{children:[r.jsx(re,{children:"Grouped"}),r.jsx(ee,{children:x.grouped})]}),r.jsxs(Q,{children:[r.jsx(re,{children:"Ungrouped"}),r.jsx(ee,{children:x.ungrouped})]})]})]})]})}function at({ct:e,assignedGroup:t}){const o=!!t,{attributes:d,listeners:x,setNodeRef:l,transform:w,transition:y,isDragging:b}=oe({id:`available-${e.singularName}`,disabled:o,data:{type:"available-item",singularName:e.singularName}}),j={transition:y,opacity:b?.4:o?.6:1,cursor:o?"not-allowed":"grab"};return r.jsxs(Gr,{ref:l,style:j,$assigned:o,title:o?`Already in "${t}"`:void 0,...o?{}:x,...o?{}:d,children:[r.jsxs(m,{alignItems:"center",gap:3,children:[o?r.jsx(Er,{children:r.jsx(A,{})}):r.jsx(se,{as:"div",children:r.jsx(A,{})}),r.jsx(J,{$assigned:o,children:r.jsx($e,{kind:e.kind})}),r.jsxs(m,{direction:"column",gap:0,alignItems:"start",children:[r.jsx(v,{textColor:o?"neutral600":"neutral800",fontWeight:o?"regular":"bold",children:e.cleanDisplayName}),o&&r.jsxs(v,{textColor:"neutral500",variant:"pi",style:{fontSize:"1.1rem"},children:["In ",t," group"]})]})]}),o&&r.jsx(Nr,{children:r.jsx(tr,{})})]})}function lt({activeTab:e,search:t,setSearch:o,filteredContentTypes:d,assignedMap:x}){return r.jsxs(yr,{children:[r.jsxs(be,{children:[r.jsxs(v,{fontWeight:"bold",textColor:"neutral800",children:["Available ",e==="collectionType"?"Collection":"Single"," Types"]}),r.jsx($r,{children:d.length})]}),r.jsx(wr,{children:r.jsxs(Cr,{children:[r.jsx(kr,{children:r.jsx(_e,{})}),r.jsx(Sr,{placeholder:`Search ${e==="collectionType"?"collection":"single"} types...`,value:t,onChange:l=>o(l.target.value)}),t&&r.jsx(Ir,{onClick:()=>o(""),children:r.jsx(Qe,{})})]})}),r.jsx(Tr,{children:r.jsx(te,{items:d.map(l=>`available-${l.singularName}`),strategy:ne,children:d.map(l=>r.jsx(at,{ct:l,assignedGroup:x.get(l.singularName)||null},l.uid))})}),r.jsx(Mr,{children:r.jsxs(Rr,{children:[r.jsx(v,{textColor:"neutral500",variant:"pi",children:"Drag items to groups on the right"}),r.jsx(Lr,{children:"i"})]})})]})}function ct({id:e,label:t,kind:o,onRemove:d}){const{attributes:x,listeners:l,setNodeRef:w,transform:y,transition:b,isDragging:j}=oe({id:e}),h={transform:me.Transform.toString(y),transition:b,opacity:j?.4:1};return r.jsxs(Jr,{ref:w,style:h,children:[r.jsxs(m,{alignItems:"center",gap:3,children:[r.jsx(se,{...x,...l,children:r.jsx(A,{})}),r.jsx(J,{children:r.jsx($e,{kind:o})}),r.jsx(v,{textColor:"neutral800",fontWeight:"bold",children:t})]}),r.jsx(he,{label:"Remove",withTooltip:!1,onClick:d,variant:"ghost",children:r.jsx(fe,{})})]})}function dt({group:e,groupIndex:t,getLabel:o,getKind:d,onRemoveItem:x,onDeleteGroup:l,onRenameGroup:w}){const[y,b]=a.useState(!1),[j,h]=a.useState(!1),W=a.useRef(null),{attributes:D,listeners:q,setNodeRef:X,transform:B,transition:H,isDragging:K}=oe({id:`group-${e.id}`}),N={transform:me.Transform.toString(B),transition:H,opacity:K?.5:1};return a.useEffect(()=>{if(!j)return;const S=E=>{W.current&&!W.current.contains(E.target)&&h(!1)};return document.addEventListener("mousedown",S),()=>document.removeEventListener("mousedown",S)},[j]),r.jsxs(Br,{ref:X,style:N,children:[r.jsxs(Wr,{children:[r.jsxs(m,{alignItems:"center",gap:3,style:{flex:1},children:[r.jsx(se,{...D,...q,children:r.jsx(A,{})}),r.jsx(zr,{children:r.jsx(we,{})}),r.jsx(v,{fontWeight:"bold",textColor:"neutral800",children:e.label}),r.jsxs(Or,{children:[e.items.length," ",e.items.length===1?"item":"items"]})]}),r.jsxs(m,{alignItems:"center",gap:1,children:[r.jsxs(Pr,{ref:W,children:[r.jsx(he,{label:"Actions",withTooltip:!1,variant:"ghost",onClick:()=>h(!j),children:r.jsx(nr,{})}),j&&r.jsxs(Hr,{children:[r.jsxs(ue,{onClick:()=>{h(!1),w(e.id)},children:[r.jsx(or,{})," Rename"]}),r.jsxs(ue,{onClick:()=>{h(!1),l(e.id)},$danger:!0,children:[r.jsx(fe,{})," Delete"]})]})]}),r.jsx(Ar,{onClick:()=>b(!y),$collapsed:y,children:r.jsx(tt,{})})]})]}),!y&&r.jsx(Kr,{children:e.items.length===0?r.jsxs(Fr,{children:[r.jsx(ot,{}),r.jsxs(Ur,{children:["Drop ",e.kind==="singleType"?"single":"collection"," types here"]}),r.jsx(Vr,{children:"or drag from the left panel"})]}):r.jsx(te,{items:e.items,strategy:ne,children:e.items.map((S,E)=>r.jsx(ct,{id:S,label:o(S),kind:d(S),onRemove:()=>x(e.id,E)},S))})})]})}function pt({groups:e,activeTab:t,getLabel:o,getKind:d,onNewGroup:x,onRemoveItem:l,onDeleteGroup:w,onRenameGroup:y}){const b=e.map(j=>`group-${j.id}`);return r.jsxs(vr,{children:[r.jsxs(be,{style:{padding:"0 0 20px 0"},children:[r.jsxs(m,{alignItems:"center",gap:2,children:[r.jsx(we,{}),r.jsxs(v,{fontWeight:"bold",textColor:"neutral800",children:["Sidebar Groups (",t==="collectionType"?"Collection Types":"Single Types",")"]})]}),r.jsx(P,{startIcon:r.jsx(er,{}),onClick:x,size:"S",children:"New Group"})]}),r.jsx(Dr,{children:e.length===0?r.jsxs(Qr,{children:[r.jsx(v,{variant:"delta",textColor:"neutral600",children:"No groups yet"}),r.jsxs(v,{variant:"pi",textColor:"neutral500",style:{marginTop:"8px"},children:["Create a group and drag ",t==="collectionType"?"collection":"single"," types into it."]})]}):r.jsx(te,{items:b,strategy:ne,children:e.map((j,h)=>r.jsx(dt,{group:j,groupIndex:h,getLabel:o,getKind:d,onRemoveItem:l,onDeleteGroup:w,onRenameGroup:y},j.id))})})]})}function ut({open:e,onOpenChange:t,mode:o,groupName:d,setGroupName:x,expanded:l,setExpanded:w,onSubmit:y}){return r.jsx(L.Root,{open:e,onOpenChange:t,children:r.jsxs(L.Content,{children:[r.jsx(L.Header,{children:r.jsx(L.Title,{children:o==="create"?"Create Group":"Rename Group"})}),r.jsx(L.Body,{children:r.jsxs(m,{direction:"column",gap:5,children:[r.jsxs(ae.Root,{children:[r.jsx(ae.Label,{children:"Group Name"}),r.jsx(_r,{value:d,onChange:b=>x(b.target.value),placeholder:"e.g. Products, Blog, HR...",autoFocus:!0,onKeyDown:b=>{b.key==="Enter"&&y()}})]}),r.jsxs(m,{gap:2,alignItems:"center",children:[r.jsx(rr,{checked:l,onCheckedChange:b=>w(b===!0)}),r.jsx(v,{textColor:"neutral800",children:"Expanded by default"})]})]})}),r.jsxs(L.Footer,{children:[r.jsx(L.Close,{children:r.jsx(P,{variant:"tertiary",children:"Cancel"})}),r.jsx(P,{onClick:y,disabled:!d.trim(),children:o==="create"?"Create":"Save"})]})]})})}const xt="cmo:config-updated";function gt(e,t){const o=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"group",d=new Set(t.map(w=>w.id));let x=o,l=2;for(;d.has(x);)x=`${o}-${l}`,l++;return x}function xe(e){const t=new Set;return{stripNumericPrefix:e.stripNumericPrefix,sortBy:e.sortBy,groups:e.groups.map(o=>({...o,label:o.label.trim()||"Group",items:o.items.filter(d=>t.has(d)?!1:(t.add(d),!0))}))}}function jt(){const[e,t]=a.useState(null),[o,d]=a.useState([]),[x,l]=a.useState(!0),[w,y]=a.useState(!1),[b,j]=a.useState(""),[h,W]=a.useState("collectionType"),[D,q]=a.useState(""),[X,B]=a.useState(!1),[H,K]=a.useState("create"),[N,S]=a.useState(""),[E,Y]=a.useState(!1),[Ce,ke]=a.useState(null),[M,ie]=a.useState(null),{toggleNotification:Z}=xr(),z=a.useRef(""),Se=sr(le(ar,{activationConstraint:{distance:5}}),le(ir,{coordinateGetter:pr}));a.useEffect(()=>{let n=!0;return Promise.all([Ue(),Ve()]).then(([i,p])=>{if(!n)return;const g=xe(i);g.groups=g.groups.map(f=>{if(f.items.length===0)return{...f,kind:f.kind||"collectionType"};const C=f.items.map(R=>p.find(k=>k.singularName===R)?.kind).filter(Boolean);if(C.length>0){const R=C.every(G=>G==="singleType"),k=C.every(G=>G==="collectionType");if(R)return{...f,kind:"singleType"};if(k)return{...f,kind:"collectionType"}}return{...f,kind:f.kind||"collectionType"}}),t(g),z.current=JSON.stringify(g),d(p)}).catch(i=>{n&&j(i?.message||"Unable to load settings")}).finally(()=>{n&&l(!1)}),()=>{n=!1}},[]);const F=a.useMemo(()=>{const n=new Map;return e?.groups.forEach(i=>i.items.forEach(p=>n.set(p,i.label))),n},[e]),Ie=a.useMemo(()=>{let n=o.filter(i=>i.kind===h);if(D.trim()){const i=D.toLowerCase();n=n.filter(p=>p.cleanDisplayName.toLowerCase().includes(i))}return n},[o,h,D]),Te=a.useMemo(()=>e!==null&&JSON.stringify(e)!==z.current,[e]),Ge=a.useMemo(()=>{const n=o.filter(g=>g.kind===h),i=n.length;let p=0;return n.forEach(g=>{F.has(g.singularName)&&p++}),{total:i,grouped:p,ungrouped:i-p}},[o,F,h]),I=a.useCallback(n=>{t(i=>i&&n(i))},[]),Ne=a.useCallback((n,i)=>{I(p=>({...p,groups:p.groups.map(g=>g.id===n?{...g,items:g.items.filter((f,C)=>C!==i)}:g)}))},[I]),Ee=a.useCallback(n=>{I(i=>({...i,groups:i.groups.filter(p=>p.id!==n)}))},[I]),Me=()=>{K("create"),S(""),Y(!1),B(!0)},Re=n=>{if(!e)return;const i=e.groups.find(p=>p.id===n);i&&(K("rename"),ke(n),S(i.label),Y(i.defaultExpanded),B(!0))},Le=()=>{N.trim()&&(I(H==="create"?n=>({...n,groups:[...n.groups,{id:gt(N,n.groups),label:N.trim(),defaultExpanded:E,kind:h,items:[]}]}):n=>({...n,groups:n.groups.map(i=>i.id===Ce?{...i,label:N.trim(),defaultExpanded:E}:i)})),B(!1))},De=n=>{ie(String(n.active.id))},Be=n=>{ie(null);const{active:i,over:p}=n;if(!p||!e)return;const g=String(i.id),f=String(p.id);if(g.startsWith("group-")&&f.startsWith("group-")){const c=e.groups.findIndex($=>`group-${$.id}`===g),u=e.groups.findIndex($=>`group-${$.id}`===f);c!==-1&&u!==-1&&c!==u&&I($=>({...$,groups:ce($.groups,c,u)}));return}if(g.startsWith("available-")){const c=g.replace("available-","");if(F.has(c))return;let u=null;if(f.startsWith("group-"))u=f.replace("group-","");else for(const T of e.groups)if(T.items.includes(f)){u=T.id;break}if(!u)return;const $=e.groups.find(T=>T.id===u),U=o.find(T=>T.singularName===c)?.kind||"collectionType",Fe=$?.kind||"collectionType";if(U!==Fe)return;I(T=>({...T,groups:T.groups.map(O=>O.id===u&&!O.items.includes(c)?{...O,items:[...O.items,c]}:O)})),Z({type:"success",title:"Success",message:`Successfully added to ${$?.label}`});return}let C=-1,R=-1;for(let c=0;c<e.groups.length;c++){const u=e.groups[c].items.indexOf(g);if(u!==-1){C=c,R=u;break}}if(C===-1)return;let k=-1,G=-1;if(f.startsWith("group-"))k=e.groups.findIndex(c=>`group-${c.id}`===f),G=k!==-1?e.groups[k].items.length:-1;else for(let c=0;c<e.groups.length;c++){const u=e.groups[c].items.indexOf(f);if(u!==-1){k=c,G=u;break}}if(k===-1)return;const He=e.groups[C].kind||"collectionType",Ke=e.groups[k].kind||"collectionType";He===Ke&&I(C===k?c=>({...c,groups:c.groups.map((u,$)=>$===C?{...u,items:ce(u.items,R,G)}:u)}):c=>{const u=c.groups.map(U=>({...U,items:[...U.items]})),[$]=u[C].items.splice(R,1);return u[k].items.splice(G,0,$),{...c,groups:u}})},We=async()=>{if(e){y(!0),j("");try{const n=await Ze(xe(e));t(n),z.current=JSON.stringify(n),window.dispatchEvent(new CustomEvent(xt,{detail:n})),Z({type:"success",title:"Saved",message:"Configuration saved successfully"})}catch(n){const i=n?.message||"Unable to save settings";j(i),Z({type:"danger",title:"Error",message:i})}finally{y(!1)}}},ze=()=>{z.current&&t(JSON.parse(z.current))},_=a.useCallback(n=>o.find(p=>p.singularName===n)?.cleanDisplayName||n,[o]),Oe=a.useCallback(n=>o.find(p=>p.singularName===n)?.kind||"collectionType",[o]);if(x)return r.jsx(V,{children:r.jsx(de.Loading,{})});if(!e)return r.jsx(V,{children:r.jsx(de.Error,{})});const Ae=M?M.startsWith("available-")?_(M.replace("available-","")):M.startsWith("group-")?e.groups.find(n=>`group-${n.id}`===M)?.label||"":_(M):"",Pe=e.groups.filter(n=>(n.kind||"collectionType")===h);return r.jsxs(V,{children:[r.jsx(st,{hasChanges:Te,saving:w,onReset:ze,onSave:We}),r.jsx(it,{activeTab:h,setActiveTab:W,sortBy:e.sortBy||"alphabetical",onChangeSortBy:n=>I(i=>({...i,sortBy:n})),stats:Ge}),b&&r.jsx(Yr,{children:b}),r.jsxs(lr,{sensors:Se,collisionDetection:cr,onDragStart:De,onDragEnd:Be,children:[r.jsxs(br,{children:[r.jsx(lt,{activeTab:h,search:D,setSearch:q,filteredContentTypes:Ie,assignedMap:F}),r.jsx(pt,{groups:Pe,activeTab:h,getLabel:_,getKind:Oe,onNewGroup:Me,onRemoveItem:Ne,onDeleteGroup:Ee,onRenameGroup:Re})]}),r.jsx(dr,{dropAnimation:null,children:M&&r.jsxs(Zr,{children:[r.jsx(A,{})," ",Ae]})})]}),r.jsx(ut,{open:X,onOpenChange:B,mode:H,groupName:N,setGroupName:S,expanded:E,setExpanded:Y,onSubmit:Le})]})}export{jt as default};
