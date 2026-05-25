/**
 * TOMS Mock Data
 * 所有 demo 页面共享的数据,挂在 window.TOMS_DATA
 */
(function () {
  const drivers = [
    { id: 'D001', name: 'James Carter', cdl: 'CDL-TX-839201', class: 'A', phone: '(214) 555-0142', email: 'j.carter@toms.demo', hireDate: '2021-03-15', status: 'Active', truckId: 'T-101', hazmatExp: '2026-08-20', medicalExp: '2026-11-05', recentSettlement: 5840.50, incidents: 0 },
    { id: 'D002', name: 'Maria Gonzalez', cdl: 'CDL-CA-712834', class: 'A', phone: '(323) 555-0198', email: 'm.gonzalez@toms.demo', hireDate: '2020-07-22', status: 'Active', truckId: 'T-102', hazmatExp: '2025-12-10', medicalExp: '2026-04-18', recentSettlement: 6210.75, incidents: 1 },
    { id: 'D003', name: 'Robert Smith', cdl: 'CDL-IL-455902', class: 'A', phone: '(312) 555-0177', email: 'r.smith@toms.demo', hireDate: '2019-01-08', status: 'Active', truckId: 'T-103', hazmatExp: null, medicalExp: '2026-09-30', recentSettlement: 5400.00, incidents: 0 },
    { id: 'D004', name: 'David Lee', cdl: 'CDL-WA-208765', class: 'A', phone: '(206) 555-0123', email: 'd.lee@toms.demo', hireDate: '2022-05-30', status: 'On Leave', truckId: null, hazmatExp: '2026-02-14', medicalExp: '2026-06-21', recentSettlement: 3120.40, incidents: 0 },
    { id: 'D005', name: 'Michael Brown', cdl: 'CDL-FL-991023', class: 'A', phone: '(305) 555-0134', email: 'm.brown@toms.demo', hireDate: '2018-11-12', status: 'Active', truckId: 'T-104', hazmatExp: '2026-03-05', medicalExp: '2026-12-15', recentSettlement: 6580.20, incidents: 2 },
    { id: 'D006', name: 'Linda Davis', cdl: 'CDL-GA-558321', class: 'B', phone: '(404) 555-0156', email: 'l.davis@toms.demo', hireDate: '2023-02-19', status: 'Active', truckId: 'T-105', hazmatExp: null, medicalExp: '2026-07-08', recentSettlement: 4850.00, incidents: 0 },
    { id: 'D007', name: 'Thomas Wilson', cdl: 'CDL-AZ-330145', class: 'A', phone: '(602) 555-0189', email: 't.wilson@toms.demo', hireDate: '2017-09-01', status: 'Active', truckId: 'T-106', hazmatExp: '2025-11-25', medicalExp: '2026-10-12', recentSettlement: 7100.80, incidents: 1 },
    { id: 'D008', name: 'Christopher Martinez', cdl: 'CDL-NY-674290', class: 'A', phone: '(718) 555-0167', email: 'c.martinez@toms.demo', hireDate: '2020-12-04', status: 'Inactive', truckId: null, hazmatExp: '2025-08-30', medicalExp: '2026-01-20', recentSettlement: 0, incidents: 0 },
    { id: 'D009', name: 'Susan Taylor', cdl: 'CDL-OH-882199', class: 'A', phone: '(614) 555-0145', email: 's.taylor@toms.demo', hireDate: '2021-08-17', status: 'Active', truckId: 'T-107', hazmatExp: '2026-05-22', medicalExp: '2026-03-09', recentSettlement: 5920.10, incidents: 0 },
    { id: 'D010', name: 'Daniel Anderson', cdl: 'CDL-PA-115488', class: 'A', phone: '(215) 555-0152', email: 'd.anderson@toms.demo', hireDate: '2022-10-25', status: 'Active', truckId: 'T-108', hazmatExp: null, medicalExp: '2026-08-14', recentSettlement: 5470.60, incidents: 0 },
  ];

  const trucks = [
    { id: 'T-101', vin: '1XPWD40X1ED215001', makeModel: 'Peterbilt 579',     year: 2021, plate: 'TX-87R234', mileage: 287340, status: 'In Service',     insuranceExp: '2026-10-12', registrationExp: '2026-09-30', dotExp: '2026-08-15', purchasePrice: 165000, currentValue: 120000 },
    { id: 'T-102', vin: '3AKJHHDR5KSKL8421', makeModel: 'Freightliner Cascadia', year: 2022, plate: 'CA-89B112', mileage: 198560, status: 'In Service', insuranceExp: '2026-11-20', registrationExp: '2026-10-22', dotExp: '2026-06-04', purchasePrice: 175000, currentValue: 138000 },
    { id: 'T-103', vin: '1FUJGBDV4DLAB5732', makeModel: 'Kenworth T680',     year: 2020, plate: 'IL-44G905', mileage: 342110, status: 'In Service',     insuranceExp: '2026-03-08', registrationExp: '2026-07-15', dotExp: '2026-05-25', purchasePrice: 155000, currentValue: 98000 },
    { id: 'T-104', vin: '1XKWD40X1HJ430911', makeModel: 'Peterbilt 389',     year: 2019, plate: 'FL-22H668', mileage: 412900, status: 'Maintenance',    insuranceExp: '2026-09-14', registrationExp: '2026-12-05', dotExp: '2026-04-30', purchasePrice: 168000, currentValue: 82000 },
    { id: 'T-105', vin: '3AKJGLD52FSGB7102', makeModel: 'Freightliner M2',   year: 2023, plate: 'GA-71L450', mileage: 86420,  status: 'In Service',    insuranceExp: '2026-12-30', registrationExp: '2026-11-12', dotExp: '2026-11-18', purchasePrice: 145000, currentValue: 132000 },
    { id: 'T-106', vin: '1XPHD49X9DD198304', makeModel: 'Peterbilt 567',     year: 2020, plate: 'AZ-58D119', mileage: 305670, status: 'In Service',    insuranceExp: '2026-05-19', registrationExp: '2026-08-04', dotExp: '2025-12-10', purchasePrice: 160000, currentValue: 105000 },
    { id: 'T-107', vin: '1FVACWDU1CHCB7541', makeModel: 'Volvo VNL 760',     year: 2021, plate: 'OH-39P772', mileage: 245890, status: 'In Service',    insuranceExp: '2026-07-11', registrationExp: '2026-06-25', dotExp: '2026-09-22', purchasePrice: 158000, currentValue: 115000 },
    { id: 'T-108', vin: '3AKJHHDR8MSLM4022', makeModel: 'Freightliner Cascadia', year: 2023, plate: 'PA-66K228', mileage: 102450, status: 'In Service', insuranceExp: '2027-02-18', registrationExp: '2026-12-30', dotExp: '2026-10-08', purchasePrice: 180000, currentValue: 158000 },
    { id: 'T-109', vin: '1XKAD49X8KJ522109', makeModel: 'Kenworth W900',     year: 2018, plate: 'NM-55T399', mileage: 458320, status: 'Maintenance',    insuranceExp: '2026-04-22', registrationExp: '2026-05-10', dotExp: '2025-11-30', purchasePrice: 152000, currentValue: 68000 },
    { id: 'T-110', vin: '1FUJGBDV2GLHB9034', makeModel: 'Mack Anthem',       year: 2022, plate: 'NV-12R844', mileage: 156780, status: 'Available',    insuranceExp: '2026-08-30', registrationExp: '2026-09-18', dotExp: '2026-07-14', purchasePrice: 170000, currentValue: 142000 },
  ];

  const trailers = [
    { id: 'TR-201', type: 'Dry Van 53ft',   capacity: '45,000 lbs', status: 'Available' },
    { id: 'TR-202', type: 'Reefer 53ft',    capacity: '44,000 lbs', status: 'In Use' },
    { id: 'TR-203', type: 'Flatbed 48ft',   capacity: '48,000 lbs', status: 'In Use' },
    { id: 'TR-204', type: 'Dry Van 53ft',   capacity: '45,000 lbs', status: 'Available' },
    { id: 'TR-205', type: 'Step Deck 53ft', capacity: '46,000 lbs', status: 'In Use' },
    { id: 'TR-206', type: 'Reefer 48ft',    capacity: '42,000 lbs', status: 'Maintenance' },
    { id: 'TR-207', type: 'Tanker',         capacity: '7,500 gal',  status: 'Available' },
    { id: 'TR-208', type: 'Dry Van 53ft',   capacity: '45,000 lbs', status: 'In Use' },
    { id: 'TR-209', type: 'Flatbed 53ft',   capacity: '48,000 lbs', status: 'Available' },
    { id: 'TR-210', type: 'Reefer 53ft',    capacity: '44,000 lbs', status: 'In Use' },
  ];

  const customers = [
    'Walmart Distribution', 'Amazon Logistics', 'Home Depot Supply',
    'Costco Wholesale', 'Target Distribution', 'Kroger Freight',
    'Lowe\'s Companies', 'FedEx Ground'
  ];

  const incomes = [
    { id: 'I-1001', date: '2026-05-22', customer: 'Walmart Distribution', loadId: 'LD-50231', truckId: 'T-101', driverId: 'D001', amount: 4250.00, status: 'Paid' },
    { id: 'I-1002', date: '2026-05-21', customer: 'Amazon Logistics',     loadId: 'LD-50232', truckId: 'T-102', driverId: 'D002', amount: 5180.00, status: 'Paid' },
    { id: 'I-1003', date: '2026-05-20', customer: 'Home Depot Supply',    loadId: 'LD-50233', truckId: 'T-103', driverId: 'D003', amount: 3920.00, status: 'Pending' },
    { id: 'I-1004', date: '2026-05-19', customer: 'Costco Wholesale',     loadId: 'LD-50234', truckId: 'T-105', driverId: 'D006', amount: 4640.00, status: 'Paid' },
    { id: 'I-1005', date: '2026-05-18', customer: 'Target Distribution',  loadId: 'LD-50235', truckId: 'T-106', driverId: 'D007', amount: 5320.00, status: 'Paid' },
    { id: 'I-1006', date: '2026-05-17', customer: 'Kroger Freight',       loadId: 'LD-50236', truckId: 'T-107', driverId: 'D009', amount: 3850.00, status: 'Pending' },
    { id: 'I-1007', date: '2026-05-15', customer: 'Lowe\'s Companies',    loadId: 'LD-50237', truckId: 'T-108', driverId: 'D010', amount: 4720.00, status: 'Paid' },
    { id: 'I-1008', date: '2026-05-14', customer: 'FedEx Ground',         loadId: 'LD-50238', truckId: 'T-101', driverId: 'D001', amount: 5050.00, status: 'Paid' },
    { id: 'I-1009', date: '2026-05-12', customer: 'Walmart Distribution', loadId: 'LD-50239', truckId: 'T-102', driverId: 'D002', amount: 4180.00, status: 'Paid' },
    { id: 'I-1010', date: '2026-05-10', customer: 'Amazon Logistics',     loadId: 'LD-50240', truckId: 'T-105', driverId: 'D006', amount: 4920.00, status: 'Paid' },
    { id: 'I-1011', date: '2026-05-08', customer: 'Home Depot Supply',    loadId: 'LD-50241', truckId: 'T-106', driverId: 'D007', amount: 3640.00, status: 'Paid' },
    { id: 'I-1012', date: '2026-05-05', customer: 'Costco Wholesale',     loadId: 'LD-50242', truckId: 'T-107', driverId: 'D009', amount: 5260.00, status: 'Overdue' },
  ];

  const expenses = [
    { id: 'E-2001', date: '2026-05-22', category: 'Fuel',           truckId: 'T-101', driverId: 'D001', vendor: 'Pilot Flying J',   amount: 845.20 },
    { id: 'E-2002', date: '2026-05-21', category: 'Fuel',           truckId: 'T-102', driverId: 'D002', vendor: 'Love\'s Travel',   amount: 720.50 },
    { id: 'E-2003', date: '2026-05-20', category: 'Maintenance',    truckId: 'T-104', driverId: null,   vendor: 'TA Truck Service', amount: 1850.00 },
    { id: 'E-2004', date: '2026-05-19', category: 'Toll Fees',      truckId: 'T-103', driverId: 'D003', vendor: 'EZ Pass',          amount: 42.80 },
    { id: 'E-2005', date: '2026-05-18', category: 'Fuel',           truckId: 'T-105', driverId: 'D006', vendor: 'Pilot Flying J',   amount: 680.90 },
    { id: 'E-2006', date: '2026-05-17', category: 'Repairs',        truckId: 'T-109', driverId: null,   vendor: 'Diesel Doctor',    amount: 2240.00 },
    { id: 'E-2007', date: '2026-05-16', category: 'Insurance',      truckId: null,    driverId: null,   vendor: 'Progressive Commercial', amount: 3850.00 },
    { id: 'E-2008', date: '2026-05-15', category: 'Driver Payments', truckId: 'T-106', driverId: 'D007', vendor: 'Payroll',          amount: 1820.00 },
    { id: 'E-2009', date: '2026-05-14', category: 'Fuel',           truckId: 'T-107', driverId: 'D009', vendor: 'Love\'s Travel',   amount: 765.30 },
    { id: 'E-2010', date: '2026-05-12', category: 'Maintenance',    truckId: 'T-103', driverId: null,   vendor: 'Quick Lube Plus',  amount: 285.00 },
    { id: 'E-2011', date: '2026-05-10', category: 'Toll Fees',      truckId: 'T-108', driverId: 'D010', vendor: 'EZ Pass',          amount: 58.40 },
    { id: 'E-2012', date: '2026-05-08', category: 'Fuel',           truckId: 'T-101', driverId: 'D001', vendor: 'TA Travel Center', amount: 820.60 },
    { id: 'E-2013', date: '2026-05-05', category: 'Miscellaneous',  truckId: null,    driverId: null,   vendor: 'Office Supplies',  amount: 124.50 },
    { id: 'E-2014', date: '2026-05-03', category: 'Repairs',        truckId: 'T-104', driverId: null,   vendor: 'Diesel Doctor',    amount: 1640.00 },
  ];

  const fuelPurchases = [
    { id: 'F-3001', date: '2026-04-05', truckId: 'T-101', state: 'TX', gallons: 145.2, fuelType: 'Diesel', pricePerGal: 3.85, total: 559.02, vendor: 'Pilot Flying J' },
    { id: 'F-3002', date: '2026-04-08', truckId: 'T-101', state: 'NM', gallons: 132.7, fuelType: 'Diesel', pricePerGal: 3.92, total: 520.18, vendor: 'Love\'s Travel' },
    { id: 'F-3003', date: '2026-04-10', truckId: 'T-101', state: 'AZ', gallons: 148.3, fuelType: 'Diesel', pricePerGal: 4.05, total: 600.62, vendor: 'TA Travel Center' },
    { id: 'F-3004', date: '2026-04-12', truckId: 'T-102', state: 'CA', gallons: 155.8, fuelType: 'Diesel', pricePerGal: 4.78, total: 744.72, vendor: 'Pilot Flying J' },
    { id: 'F-3005', date: '2026-04-15', truckId: 'T-102', state: 'NV', gallons: 142.1, fuelType: 'Diesel', pricePerGal: 4.12, total: 585.45, vendor: 'Love\'s Travel' },
    { id: 'F-3006', date: '2026-04-18', truckId: 'T-103', state: 'IL', gallons: 138.6, fuelType: 'Diesel', pricePerGal: 3.95, total: 547.47, vendor: 'TA Travel Center' },
    { id: 'F-3007', date: '2026-04-22', truckId: 'T-103', state: 'IN', gallons: 140.5, fuelType: 'Diesel', pricePerGal: 3.88, total: 545.14, vendor: 'Pilot Flying J' },
    { id: 'F-3008', date: '2026-04-25', truckId: 'T-105', state: 'GA', gallons: 130.2, fuelType: 'Diesel', pricePerGal: 3.79, total: 493.46, vendor: 'Love\'s Travel' },
    { id: 'F-3009', date: '2026-04-28', truckId: 'T-105', state: 'AL', gallons: 128.9, fuelType: 'Diesel', pricePerGal: 3.74, total: 482.09, vendor: 'TA Travel Center' },
    { id: 'F-3010', date: '2026-05-02', truckId: 'T-106', state: 'AZ', gallons: 144.5, fuelType: 'Diesel', pricePerGal: 4.08, total: 589.56, vendor: 'Pilot Flying J' },
    { id: 'F-3011', date: '2026-05-05', truckId: 'T-107', state: 'OH', gallons: 136.7, fuelType: 'Diesel', pricePerGal: 3.91, total: 534.50, vendor: 'Love\'s Travel' },
    { id: 'F-3012', date: '2026-05-10', truckId: 'T-108', state: 'PA', gallons: 152.4, fuelType: 'Diesel', pricePerGal: 4.02, total: 612.65, vendor: 'TA Travel Center' },
  ];

  // 各州里程 (季度汇总)
  const mileageByState = {
    'Q1 2026': [
      { state: 'TX', miles: 8420, gallons: 1245 },
      { state: 'CA', miles: 6850, gallons: 1010 },
      { state: 'AZ', miles: 5230, gallons: 770 },
      { state: 'NM', miles: 3120, gallons: 460 },
      { state: 'NV', miles: 2880, gallons: 425 },
      { state: 'IL', miles: 4250, gallons: 625 },
      { state: 'IN', miles: 2640, gallons: 388 },
      { state: 'OH', miles: 3180, gallons: 468 },
      { state: 'PA', miles: 2950, gallons: 434 },
      { state: 'GA', miles: 3540, gallons: 521 },
      { state: 'FL', miles: 4180, gallons: 615 },
      { state: 'AL', miles: 2230, gallons: 328 },
    ],
    'Q2 2026': [
      { state: 'TX', miles: 9120, gallons: 1342 },
      { state: 'CA', miles: 7340, gallons: 1080 },
      { state: 'AZ', miles: 5580, gallons: 821 },
      { state: 'NM', miles: 3340, gallons: 491 },
      { state: 'NV', miles: 3010, gallons: 443 },
      { state: 'IL', miles: 4520, gallons: 665 },
      { state: 'IN', miles: 2820, gallons: 415 },
      { state: 'OH', miles: 3380, gallons: 497 },
      { state: 'PA', miles: 3180, gallons: 468 },
      { state: 'GA', miles: 3760, gallons: 553 },
      { state: 'FL', miles: 4480, gallons: 659 },
      { state: 'AL', miles: 2380, gallons: 350 },
    ],
    'Q3 2025': [
      { state: 'TX', miles: 7820, gallons: 1156 },
      { state: 'CA', miles: 6320, gallons: 933 },
      { state: 'AZ', miles: 4880, gallons: 720 },
      { state: 'OH', miles: 2980, gallons: 439 },
      { state: 'PA', miles: 2710, gallons: 399 },
      { state: 'GA', miles: 3280, gallons: 483 },
      { state: 'FL', miles: 3850, gallons: 568 },
    ],
    'Q4 2025': [
      { state: 'TX', miles: 8050, gallons: 1188 },
      { state: 'CA', miles: 6620, gallons: 976 },
      { state: 'AZ', miles: 5020, gallons: 740 },
      { state: 'IL', miles: 4060, gallons: 598 },
      { state: 'OH', miles: 3050, gallons: 449 },
      { state: 'GA', miles: 3420, gallons: 503 },
      { state: 'FL', miles: 4020, gallons: 591 },
    ],
  };

  // 每州的IFTA税率(估算,2026)
  const iftaTaxRates = {
    'TX': 0.20, 'CA': 0.87, 'AZ': 0.26, 'NM': 0.23, 'NV': 0.27,
    'IL': 0.45, 'IN': 0.33, 'OH': 0.47, 'PA': 0.74, 'GA': 0.32,
    'FL': 0.36, 'AL': 0.29
  };

  const maintenanceRecords = [
    { id: 'M-4001', truckId: 'T-101', serviceType: 'Oil Change',       lastService: '2026-03-15', nextDue: '2026-06-15', mileageAtService: 275000, status: 'Upcoming' },
    { id: 'M-4002', truckId: 'T-101', serviceType: 'Tire Rotation',    lastService: '2026-02-10', nextDue: '2026-05-10', mileageAtService: 268000, status: 'Overdue' },
    { id: 'M-4003', truckId: 'T-102', serviceType: 'Brake Service',    lastService: '2026-01-20', nextDue: '2026-07-20', mileageAtService: 185000, status: 'Scheduled' },
    { id: 'M-4004', truckId: 'T-102', serviceType: 'Oil Change',       lastService: '2026-04-05', nextDue: '2026-07-05', mileageAtService: 195000, status: 'Scheduled' },
    { id: 'M-4005', truckId: 'T-103', serviceType: 'DOT Inspection',   lastService: '2026-04-22', nextDue: '2026-05-30', mileageAtService: 338000, status: 'Upcoming' },
    { id: 'M-4006', truckId: 'T-104', serviceType: 'Engine Repair',    lastService: '2026-05-18', nextDue: '2026-08-18', mileageAtService: 412000, status: 'In Progress' },
    { id: 'M-4007', truckId: 'T-105', serviceType: 'Oil Change',       lastService: '2026-05-01', nextDue: '2026-08-01', mileageAtService: 84000,  status: 'Scheduled' },
    { id: 'M-4008', truckId: 'T-106', serviceType: 'Tire Replacement', lastService: '2025-12-10', nextDue: '2026-05-25', mileageAtService: 298000, status: 'Upcoming' },
    { id: 'M-4009', truckId: 'T-107', serviceType: 'Brake Service',    lastService: '2026-03-28', nextDue: '2026-09-28', mileageAtService: 240000, status: 'Scheduled' },
    { id: 'M-4010', truckId: 'T-108', serviceType: 'Oil Change',       lastService: '2026-04-12', nextDue: '2026-07-12', mileageAtService: 98000,  status: 'Scheduled' },
    { id: 'M-4011', truckId: 'T-109', serviceType: 'Engine Repair',    lastService: '2026-05-10', nextDue: '2026-08-10', mileageAtService: 456000, status: 'In Progress' },
    { id: 'M-4012', truckId: 'T-110', serviceType: 'DOT Inspection',   lastService: '2026-02-14', nextDue: '2026-08-14', mileageAtService: 148000, status: 'Scheduled' },
    { id: 'M-4013', truckId: 'T-103', serviceType: 'Oil Change',       lastService: '2026-03-02', nextDue: '2026-06-02', mileageAtService: 332000, status: 'Upcoming' },
    { id: 'M-4014', truckId: 'T-101', serviceType: 'DOT Inspection',   lastService: '2025-08-10', nextDue: '2026-08-15', mileageAtService: 260000, status: 'Scheduled' },
    { id: 'M-4015', truckId: 'T-105', serviceType: 'Tire Rotation',    lastService: '2026-04-18', nextDue: '2026-07-18', mileageAtService: 84500,  status: 'Scheduled' },
    { id: 'M-4016', truckId: 'T-102', serviceType: 'Tire Replacement', lastService: '2025-11-22', nextDue: '2026-05-22', mileageAtService: 178000, status: 'Overdue' },
    { id: 'M-4017', truckId: 'T-107', serviceType: 'Oil Change',       lastService: '2026-02-05', nextDue: '2026-05-05', mileageAtService: 238000, status: 'Overdue' },
    { id: 'M-4018', truckId: 'T-106', serviceType: 'Oil Change',       lastService: '2026-04-22', nextDue: '2026-07-22', mileageAtService: 302000, status: 'Scheduled' },
  ];

  const alerts = [
    { type: 'license',     severity: 'danger',  title: 'CDL 即将到期 / CDL Expiring',         subject: 'Christopher Martinez', detail: 'License expires in 8 days (2026-06-02)', date: '2026-06-02' },
    { type: 'medical',     severity: 'danger',  title: 'Medical Card 即将到期 / Medical Card', subject: 'Susan Taylor',         detail: 'Medical card expires 2026-03-09 (overdue)', date: '2026-03-09' },
    { type: 'insurance',   severity: 'warning', title: '车辆保险即将到期 / Truck Insurance',   subject: 'T-103',                detail: 'Insurance expires 2026-03-08',          date: '2026-03-08' },
    { type: 'dot',         severity: 'warning', title: 'DOT 检查到期 / DOT Inspection',       subject: 'T-104',                detail: 'DOT inspection due 2026-04-30',         date: '2026-04-30' },
    { type: 'maintenance', severity: 'info',    title: '维护即将到期 / Maintenance Upcoming', subject: 'T-101 Oil Change',     detail: 'Service due 2026-06-15',                date: '2026-06-15' },
    { type: 'maintenance', severity: 'danger',  title: '维护已逾期 / Maintenance Overdue',    subject: 'T-101 Tire Rotation',  detail: 'Was due 2026-05-10 (overdue)',          date: '2026-05-10' },
    { type: 'hazmat',      severity: 'warning', title: 'Hazmat 认证到期 / Hazmat Cert',       subject: 'Thomas Wilson',        detail: 'Hazmat cert expires 2025-11-25',        date: '2025-11-25' },
  ];

  // 仪表盘:过去 6 个月营收与支出(用于 Chart.js 折线图)
  const monthlyTrend = {
    labels: ['12月 Dec', '1月 Jan', '2月 Feb', '3月 Mar', '4月 Apr', '5月 May'],
    revenue: [128400, 142800, 138500, 156200, 164800, 172500],
    expenses: [86200, 92400, 88700, 102300, 108600, 115200],
  };

  // 司机事故记录
  const incidents = [
    { id: 'IN-001', driverId: 'D002', date: '2025-12-14', type: 'Minor Accident',  description: 'Backed into post at warehouse, minor bumper damage' },
    { id: 'IN-002', driverId: 'D005', date: '2025-09-08', type: 'Traffic Violation', description: 'Speeding ticket - 12 over limit' },
    { id: 'IN-003', driverId: 'D005', date: '2026-02-19', type: 'Customer Complaint', description: 'Late delivery without notification' },
    { id: 'IN-004', driverId: 'D007', date: '2025-11-02', type: 'Traffic Violation', description: 'Lane change without signal' },
  ];

  window.TOMS_DATA = {
    drivers, trucks, trailers, customers,
    incomes, expenses, fuelPurchases, mileageByState, iftaTaxRates,
    maintenanceRecords, alerts, monthlyTrend, incidents,
  };
})();
