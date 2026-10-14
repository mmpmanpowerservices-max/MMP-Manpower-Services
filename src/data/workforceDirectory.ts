export interface WorkforceSector {
  id: string;
  categoryName: string;
  badge: string;
  color: string;
  iconName: string;
  roles: {
    title: string;
    subtext: string;
    focus: string;
    description: string;
  }[];
}

export const WORKFORCE_SECTORS: WorkforceSector[] = [
  {
    id: 'office-admin',
    categoryName: 'Facility & Office Administration',
    badge: 'OFFICE & ADMIN',
    color: 'from-blue-600 to-indigo-700',
    iconName: 'Building',
    roles: [
      {
        title: 'Housekeeping Staff',
        subtext: 'Sanitation & Cleanliness',
        focus: 'Facility Hygiene',
        description: 'Commercial facility cleaning, waste disposal, floor scrubbing, and sanitized workplace standards.',
      },
      {
        title: 'Office Assistants & Peons',
        subtext: 'Office Errands & Support',
        focus: 'Day-to-Day Operations',
        description: 'Document delivery, bank visits, printing, conference room setups, and administrative support.',
      },
      {
        title: 'Front Desk Receptionist',
        subtext: 'Visitor Desk & Calls',
        focus: 'Guest Relations',
        description: 'Visitor sign-in, EPABX call routing, courier management, and professional front-office representation.',
      },
      {
        title: 'Data Entry Operator (DEO)',
        subtext: 'Typing & MS Excel Records',
        focus: 'Digital Records',
        description: 'Fast numeric/alpha typing (35+ WPM), Excel maintenance, data cleaning, and ERP entry.',
      },
      {
        title: 'Pantry & Refreshment Staff',
        subtext: 'Beverages & Pantry Care',
        focus: 'Corporate Hospitality',
        description: 'Executive beverage serving, tea/coffee station upkeep, cafeteria hygiene, and VIP meeting refreshments.',
      },
      {
        title: 'Billing & Tally Assistant',
        subtext: 'Invoicing & Basic Accounts',
        focus: 'Accounting Support',
        description: 'Generating sales invoices, E-way bills, purchase ledger data entry, and basic Tally vouchers.',
      },
    ],
  },
  {
    id: 'security-guarding',
    categoryName: 'Security & Asset Protection',
    badge: 'SECURITY GUARDING',
    color: 'from-amber-600 to-yellow-700',
    iconName: 'Shield',
    roles: [
      {
        title: 'Day & Night Security Guards',
        subtext: '24/7 Perimeter Protection',
        focus: 'Static Guarding',
        description: 'Round-the-clock entrance guarding, perimeter checks, visitor register tracking, and incident logging.',
      },
      {
        title: 'Commercial Complex Guards',
        subtext: 'Malls & Corporate Towers',
        focus: 'Access Control',
        description: 'Metal detector screening, baggage checks, parking lane discipline, and lift lobby surveillance.',
      },
      {
        title: 'Residential Township Guards',
        subtext: 'Gated Community Security',
        focus: 'Visitor Screening',
        description: 'Vehicle barrier operation, delivery partner verification (MyGate/NoBroker), and nighttime patrolling.',
      },
      {
        title: 'Security Field Supervisors',
        subtext: 'Shift Roster & Patrolling',
        focus: 'Team Leadership',
        description: 'Managing 10-30 guard shifts, turn-out inspection, guard briefing, and client escalation handling.',
      },
      {
        title: 'Female Security Personnel',
        subtext: 'Women Screening & Safety',
        focus: 'Female Checkpoints',
        description: 'Frisking at women-only entrances, corporate floor safety, event escort, and dignified security.',
      },
      {
        title: 'CCTV Surveillance Operator',
        subtext: 'Monitoring & Incident Log',
        focus: 'Electronic Security',
        description: 'NVR/DVR multi-screen monitoring, footage tagging, emergency protocol alerts, and control room logs.',
      },
    ],
  },
  {
    id: 'industrial-logistics',
    categoryName: 'Industrial, Factory & Logistics',
    badge: 'INDUSTRIAL & LOGISTICS',
    color: 'from-emerald-600 to-teal-700',
    iconName: 'Cpu',
    roles: [
      {
        title: 'Assembly Line Workers',
        subtext: 'Manufacturing & Assembly',
        focus: 'Production Staff',
        description: 'High-speed conveyor assembly, electronics screw fastening, wiring harness routing, and 5S compliance.',
      },
      {
        title: 'Warehouse Pickers & Packers',
        subtext: 'Order Packing & Barcoding',
        focus: 'Fulfillment Crew',
        description: 'Barcode scanning, picking SKUs from high-bay racks, corrugated box carton packing, and dispatch labeling.',
      },
      {
        title: 'Loading & Unloading Labor',
        subtext: 'Material Stacking & Shifting',
        focus: 'Heavy Material Force',
        description: 'Truck unloading, manual palletization, grain/chemical bag stacking, and dock container stripping.',
      },
      {
        title: 'Forklift & BOPT Operators',
        subtext: 'Stacker & Pallet Handling',
        focus: 'Licensed Heavy Equip.',
        description: 'Certified battery operated pallet truck (BOPT) and counterbalance forklift handling in narrow aisles.',
      },
      {
        title: 'Quality Inspectors (QA)',
        subtext: 'Defect Detection & Checking',
        focus: 'Quality Control',
        description: 'Vernier caliper/micrometer measurements, visual solder inspection, sampling tests, and rejection reports.',
      },
      {
        title: 'Last-Mile Delivery Associates',
        subtext: 'Two-Wheeler Dispatch Fleet',
        focus: 'Fast Courier Logistics',
        description: 'E-commerce doorstep package drop-offs, COD cash handling, OTP delivery confirmations, and route adherence.',
      },
    ],
  },
  {
    id: 'it-specialized',
    categoryName: 'Technical, IT & BPO Support',
    badge: 'IT & SPECIALIZED',
    color: 'from-purple-600 to-pink-700',
    iconName: 'Laptop',
    roles: [
      {
        title: 'BPO Inbound Support Execs',
        subtext: 'Customer Care & Helpdesk',
        focus: 'Multilingual Reps',
        description: 'Handling incoming customer queries in Kannada, English, Hindi, and Telugu with high CSAT.',
      },
      {
        title: 'Outbound Telemarketing Reps',
        subtext: 'Lead Qualification & Calls',
        focus: 'Telephonic Sales',
        description: 'Cold-calling pre-screened database, appointment scheduling, insurance/loan pitches, and CRM updates.',
      },
      {
        title: 'Desktop & Hardware Support',
        subtext: 'PC Setup & Troubleshooting',
        focus: 'Technical Troubleshooting',
        description: 'Windows/Linux OS installation, printer drivers, antivirus configuration, and laptop repair assistance.',
      },
      {
        title: 'Network & Cabling Techs',
        subtext: 'LAN, Router & Wi-Fi Setups',
        focus: 'Infrastructure Tech',
        description: 'Cat6 cable crimping, patch panel punching, Wi-Fi access point mounting, and fiber router testing.',
      },
      {
        title: 'Junior Web Developers & QA',
        subtext: 'Frontend, Coding & Testing',
        focus: 'Software Talent',
        description: 'HTML/CSS/React updates, responsive bug verification, cross-browser manual testing, and staging deploys.',
      },
      {
        title: 'MIS & Reporting Executives',
        subtext: 'Dashboards & Analytics',
        focus: 'Data Insights',
        description: 'Advanced Excel formulas (VLOOKUP, INDEX/MATCH, Pivot Tables), Google Sheets automation, and daily HR summaries.',
      },
    ],
  },
  {
    id: 'field-sales',
    categoryName: 'Field Sales, Marketing & Retail',
    badge: 'FIELD & SALES',
    color: 'from-rose-600 to-red-700',
    iconName: 'TrendingUp',
    roles: [
      {
        title: 'B2B Field Sales Executives',
        subtext: 'Market Visits & Client Deals',
        focus: 'Direct Territory Sales',
        description: 'Daily merchant visits, distributor onboarding, payment collections, and product catalog presentations.',
      },
      {
        title: 'Brand Promoters & Ambassadors',
        subtext: 'Product Demo & Engagements',
        focus: 'Brand Awareness',
        description: 'In-store live sampling, kiosk demonstrations, customer engagement, and promotional brochure distribution.',
      },
      {
        title: 'Retail Counter Sales Staff',
        subtext: 'Showrooms & Retail Stores',
        focus: 'Store In-Sales',
        description: 'Apparel/electronics customer greeting, billing assistance, upselling accessories, and stock display.',
      },
      {
        title: 'Field Surveyors & Enumerators',
        subtext: 'Door-to-Door Data Capture',
        focus: 'Market Research',
        description: 'Geo-tagged GPS tablet surveys, consumer census, agricultural yield sampling, and questionnaire logging.',
      },
      {
        title: 'Flyer & Marketing Distributors',
        subtext: 'Local Promotion Distribution',
        focus: 'Ground Activation',
        description: 'Door-to-door pamphlet drops, morning newspaper inserts, junction hand-to-hand distribution.',
      },
      {
        title: 'Campaign Field Coordinators',
        subtext: 'Team Supervision on Ground',
        focus: 'Campaign Leadership',
        description: 'Tracking 10+ field promoter attendance, stock replenishment, daily selfie geo-proof reporting.',
      },
    ],
  },
  {
    id: 'events-hospitality',
    categoryName: 'Events, Exhibitions & Hospitality',
    badge: 'EVENTS & EXPO',
    color: 'from-cyan-600 to-blue-800',
    iconName: 'Sparkles',
    roles: [
      {
        title: 'Event Ushers, Hosts & Hostesses',
        subtext: 'Stage Coordination & Greeting',
        focus: 'Guest Welcoming',
        description: 'Welcoming dignitaries, stage flower bouquets, badge distribution, and auditorium seating management.',
      },
      {
        title: 'Registration Desk Personnel',
        subtext: 'Badge Printing & Scanning',
        focus: 'Delegate Check-in',
        description: 'QR code attendee check-in, thermal badge printer operation, kit bag handing, and spot registrations.',
      },
      {
        title: 'Crowd Marshals & Bouncers',
        subtext: 'Venue Discipline & Aisles',
        focus: 'Crowd Security',
        description: 'Barricade queue control, artist protection, exit flow clearance, and civil dispute de-escalation.',
      },
      {
        title: 'VIP Hospitality & Protocol',
        subtext: 'Dignitary Handling & Escorts',
        focus: 'VIP Protocol Care',
        description: 'Lounge service, ministerial convoy coordination, dietary preference management, and VIP escorting.',
      },
      {
        title: 'Banquet Stewards & Servers',
        subtext: 'Food & Beverage Hospitality',
        focus: 'Catering Service',
        description: 'Buffet replenishment, silver cutlery table setting, tray service, and quick table clearance.',
      },
      {
        title: 'Exhibition Stall Assistants',
        subtext: 'Booth Upkeep & Inquiries',
        focus: 'Expo Booth Support',
        description: 'Visiting card collection, promotional giveaway handout, visitor tally logging, and booth cleanliness.',
      },
    ],
  },
];
