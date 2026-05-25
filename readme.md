# Trucking Operations Management System (TOMS)

## Project Overview

A lightweight, browser-based trucking operations management platform designed for small and medium-sized fleet companies.

The system focuses on:
- fleet operations
- driver management
- financial tracking
- maintenance records
- IFTA reporting
- operational visibility

The platform is designed to replace fragmented workflows currently handled through:
- Excel spreadsheets
- paper records
- QuickBooks
- email-based coordination

Primary goals:
- centralized operational data
- faster access to records
- simplified reporting
- scalable architecture
- mobile-friendly management dashboard

---

# Target Users

## 1. Administrators

Full system access:
- manage drivers
- manage trucks/trailers
- manage settlements
- maintenance tracking
- financial reporting
- export reports
- IFTA reporting

## 2. Drivers

Limited access:
- personal profile
- assigned truck/trailer
- settlements
- upload receipts/documents
- maintenance issue reporting

---

# Core Modules

---

# 1. Dashboard Module

## Purpose

Provide quick operational visibility.

## Main Widgets

### Fleet Overview
- Total Trucks
- Active Drivers
- Available Trailers
- Trucks in Maintenance

### Financial Summary
- Monthly Revenue
- Fuel Expenses
- Maintenance Costs
- Driver Settlements

### Alerts
- License Expiration
- Insurance Expiration
- Upcoming Maintenance
- DOT Inspection Due

### IFTA Summary
- Quarterly Fuel Usage
- Miles by Jurisdiction
- Estimated Tax Liability

---

# 2. Driver Management Module

## Features

### Driver Profiles
- Full Name
- Contact Information
- License Number
- CDL Class
- Hire Date
- Status

### Certifications
- Hazmat
- Medical Card
- Safety Training
- Expiration Dates

### Incident Logs
- accidents
- violations
- complaints
- disciplinary records

### Settlement Tracking
- pay period
- mileage
- deductions
- bonuses
- payment history

---

# 3. Equipment Management Module

## Truck Management

### Fields
- Truck Number
- VIN
- Make/Model
- Year
- License Plate
- Insurance
- Registration
- Mileage

## Trailer Management

### Fields
- Trailer Number
- Trailer Type
- Capacity
- Status

## Maintenance Tracking

### Features
- Preventive Maintenance Schedule
- Oil Changes
- Tire Replacement
- Brake Service
- Repair History

### Maintenance Alerts
- upcoming service
- overdue maintenance
- inspection reminders

## Depreciation Tracking

### Data
- purchase price
- depreciation method
- current value

---

# 4. Income & Expense Module

## Income Tracking

### Fields
- Customer
- Load ID
- Revenue Amount
- Payment Status
- Date

## Expense Tracking

### Categories
- Fuel
- Maintenance
- Insurance
- Toll Fees
- Repairs
- Driver Payments
- Miscellaneous

## Filters

### Search By
- Truck
- Driver
- Trailer
- Customer
- Date Range

## Export

### Formats
- CSV
- Excel

---

# 5. IFTA Reporting Module

## Purpose

Simplify quarterly IFTA reporting.

## Features

### Fuel Purchases
- gallons
- fuel type
- state/jurisdiction
- vendor
- receipt upload

### Mileage Tracking
- trip records
- odometer readings
- miles per jurisdiction

### Quarterly Reports
- fuel tax summary
- taxable miles
- exportable report

## Output
- printable reports
- CSV export
- PDF export

---

# 6. Authentication & Permissions

## Role-Based Access Control (RBAC)

### Admin
Full access.

### Driver
Restricted access:
- own records only
- no financial admin permissions

## Authentication Features

- login/logout
- password reset
- session management
- optional 2FA

---

# 7. Reporting Module

## Reports

### Financial Reports
- profit/loss
- expense trends
- revenue analysis

### Fleet Reports
- truck utilization
- maintenance cost analysis

### Driver Reports
- performance
- incidents
- settlements

### Export Formats
- PDF
- CSV
- Excel

---

# Suggested Technology Stack

## Backend Options
- Laravel
- Django
- Node.js + Express

## Frontend Options
- React
- Vue
- Bootstrap Admin

## Database
- PostgreSQL
- MySQL

## Reporting
- ExcelJS
- Laravel Excel
- JasperReports (optional)

---

# Suggested Database Tables

## Core Tables

### users
### roles
### drivers
### trucks
### trailers
### maintenance_records
### expenses
### incomes
### settlements
### ifta_reports
### fuel_purchases
### trip_logs
### customers
### incidents

---

# Suggested MVP Scope

## Phase 1
- authentication
- dashboard
- drivers
- trucks/trailers

## Phase 2
- financial tracking
- maintenance
- exports

## Phase 3
- IFTA reporting
- analytics
- mobile optimization

---

# UI/UX Direction

## Design Philosophy

- data-first
- fast navigation
- minimal clicks
- enterprise-style dashboard
- responsive layout

## Visual Style

- clean Bootstrap admin layout
- dark sidebar
- light content area
- table-heavy interfaces
- charts for summary only

---

# Potential Future Features

## Dispatch Management
## GPS Tracking
## ELD Integration
## Invoice Generation
## Driver Mobile App
## OCR Receipt Upload
## AI Maintenance Prediction
## Fuel Efficiency Analytics

---

# Demo Recommendation

## Initial Demo Screens

### 1. Login Page
### 2. Dashboard
### 3. Driver List
### 4. Equipment List
### 5. Expense Tracking
### 6. IFTA Summary
### 7. Maintenance Schedule

---

# Product Vision

The long-term goal is to evolve from a custom fleet management dashboard into a reusable SaaS platform for:
- owner operators
- small trucking companies
- regional logistics operators

Focus areas:
- operational simplicity
- compliance support
- financial visibility
- scalable fleet management

