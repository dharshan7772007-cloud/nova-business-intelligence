import { Transaction } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  // Recent month (Month 6)
  { id: 'TX-9041', date: '2026-10-29', customer: 'Aura Dynamics Ltd', customerEmail: 'accounts@auradynamics.io', product: 'Apex Quantum Server', category: 'Hardware & Devices', quantity: 2, unitPrice: 4200, revenue: 8400, status: 'completed', channel: 'Direct Sales' },
  { id: 'TX-9040', date: '2026-10-28', customer: 'Hyperion Labs', customerEmail: 'billing@hyperionlabs.tech', product: 'Enterprise Cloud Core', category: 'Cloud Services', quantity: 1, unitPrice: 2400, revenue: 2400, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9039', date: '2026-10-27', customer: 'Vortex Media Group', customerEmail: 'finance@vortexmedia.co', product: 'Predictive Analytics Suite', category: 'SaaS Subscriptions', quantity: 3, unitPrice: 1250, revenue: 3750, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9038', date: '2026-10-26', customer: 'Synthetix AI', customerEmail: 'ops@synthetix.ai', product: 'Architecture Consultation', category: 'Consulting & Retainers', quantity: 10, unitPrice: 280, revenue: 2800, status: 'completed', channel: 'B2B Wholesale' },
  { id: 'TX-9037', date: '2026-10-25', customer: 'Cobalt Systems', customerEmail: 'procure@cobaltsys.org', product: 'Titan Fiber Bridge', category: 'Accessories', quantity: 4, unitPrice: 450, revenue: 1800, status: 'completed', channel: 'Marketplace' },
  { id: 'TX-9036', date: '2026-10-24', customer: 'Solaris Fintech', customerEmail: 'pay@solarisfin.com', product: 'Apex Quantum Server', category: 'Hardware & Devices', quantity: 1, unitPrice: 4200, revenue: 4200, status: 'completed', channel: 'Direct Sales' },
  { id: 'TX-9035', date: '2026-10-23', customer: 'Nexus Robotics', customerEmail: 'admin@nexusrobotics.net', product: 'Enterprise Cloud Core', category: 'Cloud Services', quantity: 2, unitPrice: 2400, revenue: 4800, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9034', date: '2026-10-21', customer: 'Krypton Interactive', customerEmail: 'support@krypton.gg', product: 'Predictive Analytics Suite', category: 'SaaS Subscriptions', quantity: 1, unitPrice: 1250, revenue: 1250, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9033', date: '2026-10-20', customer: 'Zenith Healthtech', customerEmail: 'accounts@zenithhealth.org', product: 'Security Audit & Compliance', category: 'Consulting & Retainers', quantity: 1, unitPrice: 3500, revenue: 3500, status: 'completed', channel: 'B2B Wholesale' },
  { id: 'TX-9032', date: '2026-10-18', customer: 'Aura Dynamics Ltd', customerEmail: 'accounts@auradynamics.io', product: 'Enterprise Cloud Core', category: 'Cloud Services', quantity: 1, unitPrice: 2400, revenue: 2400, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9031', date: '2026-10-16', customer: 'Prism Creative', customerEmail: 'studio@prismcreative.design', product: 'Titan Fiber Bridge', category: 'Accessories', quantity: 2, unitPrice: 450, revenue: 900, status: 'completed', channel: 'Marketplace' },
  { id: 'TX-9030', date: '2026-10-14', customer: 'Aegis Cyber Defense', customerEmail: 'ciso@aegisdefense.io', product: 'Apex Quantum Server', category: 'Hardware & Devices', quantity: 3, unitPrice: 4200, revenue: 12600, status: 'completed', channel: 'Direct Sales' },
  { id: 'TX-9029', date: '2026-10-12', customer: 'Hyperion Labs', customerEmail: 'billing@hyperionlabs.tech', product: 'Architecture Consultation', category: 'Consulting & Retainers', quantity: 8, unitPrice: 280, revenue: 2240, status: 'completed', channel: 'B2B Wholesale' },
  { id: 'TX-9028', date: '2026-10-10', customer: 'Starlight Logistics', customerEmail: 'fleet@starlight.co', product: 'Predictive Analytics Suite', category: 'SaaS Subscriptions', quantity: 2, unitPrice: 1250, revenue: 2500, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9027', date: '2026-10-08', customer: 'OmniVenture Partners', customerEmail: 'dealflow@omnivp.vc', product: 'Security Audit & Compliance', category: 'Consulting & Retainers', quantity: 1, unitPrice: 3500, revenue: 3500, status: 'completed', channel: 'Direct Sales' },
  { id: 'TX-9026', date: '2026-10-06', customer: 'Vortex Media Group', customerEmail: 'finance@vortexmedia.co', product: 'Titan Fiber Bridge', category: 'Accessories', quantity: 6, unitPrice: 450, revenue: 2700, status: 'completed', channel: 'Marketplace' },
  { id: 'TX-9025', date: '2026-10-04', customer: 'Synthetix AI', customerEmail: 'ops@synthetix.ai', product: 'Enterprise Cloud Core', category: 'Cloud Services', quantity: 2, unitPrice: 2400, revenue: 4800, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9024', date: '2026-10-02', customer: 'Solaris Fintech', customerEmail: 'pay@solarisfin.com', product: 'Predictive Analytics Suite', category: 'SaaS Subscriptions', quantity: 2, unitPrice: 1250, revenue: 2500, status: 'completed', channel: 'Online Store' },

  // Month 5 (September 2026)
  { id: 'TX-9023', date: '2026-09-28', customer: 'Aegis Cyber Defense', customerEmail: 'ciso@aegisdefense.io', product: 'Apex Quantum Server', category: 'Hardware & Devices', quantity: 1, unitPrice: 4200, revenue: 4200, status: 'completed', channel: 'Direct Sales' },
  { id: 'TX-9022', date: '2026-09-26', customer: 'Nexus Robotics', customerEmail: 'admin@nexusrobotics.net', product: 'Titan Fiber Bridge', category: 'Accessories', quantity: 5, unitPrice: 450, revenue: 2250, status: 'completed', channel: 'Marketplace' },
  { id: 'TX-9021', date: '2026-09-24', customer: 'Hyperion Labs', customerEmail: 'billing@hyperionlabs.tech', product: 'Enterprise Cloud Core', category: 'Cloud Services', quantity: 1, unitPrice: 2400, revenue: 2400, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9020', date: '2026-09-22', customer: 'Cobalt Systems', customerEmail: 'procure@cobaltsys.org', product: 'Predictive Analytics Suite', category: 'SaaS Subscriptions', quantity: 1, unitPrice: 1250, revenue: 1250, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9019', date: '2026-09-19', customer: 'Zenith Healthtech', customerEmail: 'accounts@zenithhealth.org', product: 'Apex Quantum Server', category: 'Hardware & Devices', quantity: 2, unitPrice: 4200, revenue: 8400, status: 'completed', channel: 'Direct Sales' },
  { id: 'TX-9018', date: '2026-09-16', customer: 'Aura Dynamics Ltd', customerEmail: 'accounts@auradynamics.io', product: 'Architecture Consultation', category: 'Consulting & Retainers', quantity: 12, unitPrice: 280, revenue: 3360, status: 'completed', channel: 'B2B Wholesale' },
  { id: 'TX-9017', date: '2026-09-14', customer: 'Krypton Interactive', customerEmail: 'support@krypton.gg', product: 'Titan Fiber Bridge', category: 'Accessories', quantity: 3, unitPrice: 450, revenue: 1350, status: 'completed', channel: 'Marketplace' },
  { id: 'TX-9016', date: '2026-09-12', customer: 'Synthetix AI', customerEmail: 'ops@synthetix.ai', product: 'Predictive Analytics Suite', category: 'SaaS Subscriptions', quantity: 2, unitPrice: 1250, revenue: 2500, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9015', date: '2026-09-09', customer: 'Starlight Logistics', customerEmail: 'fleet@starlight.co', product: 'Enterprise Cloud Core', category: 'Cloud Services', quantity: 1, unitPrice: 2400, revenue: 2400, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9014', date: '2026-09-06', customer: 'Prism Creative', customerEmail: 'studio@prismcreative.design', product: 'Apex Quantum Server', category: 'Hardware & Devices', quantity: 1, unitPrice: 4200, revenue: 4200, status: 'completed', channel: 'Direct Sales' },
  { id: 'TX-9013', date: '2026-09-03', customer: 'Vortex Media Group', customerEmail: 'finance@vortexmedia.co', product: 'Security Audit & Compliance', category: 'Consulting & Retainers', quantity: 1, unitPrice: 3500, revenue: 3500, status: 'completed', channel: 'B2B Wholesale' },

  // Month 4 (August 2026)
  { id: 'TX-9012', date: '2026-08-29', customer: 'OmniVenture Partners', customerEmail: 'dealflow@omnivp.vc', product: 'Predictive Analytics Suite', category: 'SaaS Subscriptions', quantity: 4, unitPrice: 1250, revenue: 5000, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9011', date: '2026-08-25', customer: 'Solaris Fintech', customerEmail: 'pay@solarisfin.com', product: 'Enterprise Cloud Core', category: 'Cloud Services', quantity: 2, unitPrice: 2400, revenue: 4800, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9010', date: '2026-08-22', customer: 'Cobalt Systems', customerEmail: 'procure@cobaltsys.org', product: 'Apex Quantum Server', category: 'Hardware & Devices', quantity: 2, unitPrice: 4200, revenue: 8400, status: 'completed', channel: 'Direct Sales' },
  { id: 'TX-9009', date: '2026-08-18', customer: 'Hyperion Labs', customerEmail: 'billing@hyperionlabs.tech', product: 'Titan Fiber Bridge', category: 'Accessories', quantity: 4, unitPrice: 450, revenue: 1800, status: 'completed', channel: 'Marketplace' },
  { id: 'TX-9008', date: '2026-08-14', customer: 'Aura Dynamics Ltd', customerEmail: 'accounts@auradynamics.io', product: 'Security Audit & Compliance', category: 'Consulting & Retainers', quantity: 1, unitPrice: 3500, revenue: 3500, status: 'completed', channel: 'B2B Wholesale' },
  { id: 'TX-9007', date: '2026-08-10', customer: 'Aegis Cyber Defense', customerEmail: 'ciso@aegisdefense.io', product: 'Enterprise Cloud Core', category: 'Cloud Services', quantity: 3, unitPrice: 2400, revenue: 7200, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9006', date: '2026-08-05', customer: 'Zenith Healthtech', customerEmail: 'accounts@zenithhealth.org', product: 'Architecture Consultation', category: 'Consulting & Retainers', quantity: 6, unitPrice: 280, revenue: 1680, status: 'completed', channel: 'B2B Wholesale' },

  // Month 3 (July 2026)
  { id: 'TX-9005', date: '2026-07-28', customer: 'Nexus Robotics', customerEmail: 'admin@nexusrobotics.net', product: 'Apex Quantum Server', category: 'Hardware & Devices', quantity: 1, unitPrice: 4200, revenue: 4200, status: 'completed', channel: 'Direct Sales' },
  { id: 'TX-9004', date: '2026-07-23', customer: 'Vortex Media Group', customerEmail: 'finance@vortexmedia.co', product: 'Enterprise Cloud Core', category: 'Cloud Services', quantity: 1, unitPrice: 2400, revenue: 2400, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9003', date: '2026-07-19', customer: 'Synthetix AI', customerEmail: 'ops@synthetix.ai', product: 'Titan Fiber Bridge', category: 'Accessories', quantity: 2, unitPrice: 450, revenue: 900, status: 'completed', channel: 'Marketplace' },
  { id: 'TX-9002', date: '2026-07-15', customer: 'Solaris Fintech', customerEmail: 'pay@solarisfin.com', product: 'Security Audit & Compliance', category: 'Consulting & Retainers', quantity: 1, unitPrice: 3500, revenue: 3500, status: 'completed', channel: 'B2B Wholesale' },
  { id: 'TX-9001', date: '2026-07-11', customer: 'Prism Creative', customerEmail: 'studio@prismcreative.design', product: 'Predictive Analytics Suite', category: 'SaaS Subscriptions', quantity: 1, unitPrice: 1250, revenue: 1250, status: 'completed', channel: 'Online Store' },
  { id: 'TX-9000', date: '2026-07-06', customer: 'Starlight Logistics', customerEmail: 'fleet@starlight.co', product: 'Apex Quantum Server', category: 'Hardware & Devices', quantity: 1, unitPrice: 4200, revenue: 4200, status: 'completed', channel: 'Direct Sales' },

  // Month 2 (June 2026)
  { id: 'TX-8999', date: '2026-06-27', customer: 'Aegis Cyber Defense', customerEmail: 'ciso@aegisdefense.io', product: 'Apex Quantum Server', category: 'Hardware & Devices', quantity: 2, unitPrice: 4200, revenue: 8400, status: 'completed', channel: 'Direct Sales' },
  { id: 'TX-8998', date: '2026-06-22', customer: 'Hyperion Labs', customerEmail: 'billing@hyperionlabs.tech', product: 'Enterprise Cloud Core', category: 'Cloud Services', quantity: 2, unitPrice: 2400, revenue: 4800, status: 'completed', channel: 'Online Store' },
  { id: 'TX-8997', date: '2026-06-17', customer: 'Cobalt Systems', customerEmail: 'procure@cobaltsys.org', product: 'Architecture Consultation', category: 'Consulting & Retainers', quantity: 5, unitPrice: 280, revenue: 1400, status: 'completed', channel: 'B2B Wholesale' },
  { id: 'TX-8996', date: '2026-06-12', customer: 'Aura Dynamics Ltd', customerEmail: 'accounts@auradynamics.io', product: 'Predictive Analytics Suite', category: 'SaaS Subscriptions', quantity: 2, unitPrice: 1250, revenue: 2500, status: 'completed', channel: 'Online Store' },
  { id: 'TX-8995', date: '2026-06-08', customer: 'Krypton Interactive', customerEmail: 'support@krypton.gg', product: 'Titan Fiber Bridge', category: 'Accessories', quantity: 4, unitPrice: 450, revenue: 1800, status: 'completed', channel: 'Marketplace' },

  // Month 1 (May 2026)
  { id: 'TX-8994', date: '2026-05-29', customer: 'OmniVenture Partners', customerEmail: 'dealflow@omnivp.vc', product: 'Enterprise Cloud Core', category: 'Cloud Services', quantity: 1, unitPrice: 2400, revenue: 2400, status: 'completed', channel: 'Online Store' },
  { id: 'TX-8993', date: '2026-05-24', customer: 'Zenith Healthtech', customerEmail: 'accounts@zenithhealth.org', product: 'Predictive Analytics Suite', category: 'SaaS Subscriptions', quantity: 1, unitPrice: 1250, revenue: 1250, status: 'completed', channel: 'Online Store' },
  { id: 'TX-8992', date: '2026-05-18', customer: 'Solaris Fintech', customerEmail: 'pay@solarisfin.com', product: 'Apex Quantum Server', category: 'Hardware & Devices', quantity: 1, unitPrice: 4200, revenue: 4200, status: 'completed', channel: 'Direct Sales' },
  { id: 'TX-8991', date: '2026-05-12', customer: 'Nexus Robotics', customerEmail: 'admin@nexusrobotics.net', product: 'Security Audit & Compliance', category: 'Consulting & Retainers', quantity: 1, unitPrice: 3500, revenue: 3500, status: 'completed', channel: 'B2B Wholesale' },
  { id: 'TX-8990', date: '2026-05-04', customer: 'Synthetix AI', customerEmail: 'ops@synthetix.ai', product: 'Titan Fiber Bridge', category: 'Accessories', quantity: 2, unitPrice: 450, revenue: 900, status: 'completed', channel: 'Marketplace' }
];

export const SAMPLE_CSV_TEMPLATE = `Transaction ID,Date,Customer,Product,Category,Quantity,Revenue,Status
TX-1001,2026-10-01,Acme Corp,Apex Quantum Server,Hardware & Devices,2,8400,completed
TX-1002,2026-10-03,Starlight Bio,Enterprise Cloud Core,Cloud Services,1,2400,completed
TX-1003,2026-10-05,CyberWorks,Predictive Analytics Suite,SaaS Subscriptions,3,3750,completed
TX-1004,2026-10-08,Nexus Dynamics,Titan Fiber Bridge,Accessories,5,2250,completed
TX-1005,2026-10-12,Zenith Retail,Architecture Consultation,Consulting & Retainers,8,2240,completed
TX-1006,2026-10-15,Vortex Group,Apex Quantum Server,Hardware & Devices,1,4200,completed
TX-1007,2026-10-19,Hyperion Labs,Security Audit & Compliance,Consulting & Retainers,1,3500,completed
TX-1008,2026-10-22,Solaris Tech,Predictive Analytics Suite,SaaS Subscriptions,2,2500,completed
TX-1009,2026-10-25,Aura Global,Enterprise Cloud Core,Cloud Services,2,4800,completed
TX-1010,2026-10-28,Cobalt Systems,Titan Fiber Bridge,Accessories,4,1800,completed`;
