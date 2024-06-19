import { FeesIcon, GuarantorIcons, HandshakeIcon, KarmaIcon, LoanProductIcon, LoanRequestIcon, LoansIcon, Preferences, Pricing, ReportIcon, SavingsIcon, SavingsProductIcon, ServiceAcctIcon, ServiceIcon, TransactionIcon, UserCheckIcon, Users, AuditLogIcon, settlementIcon } from "@/public/icons/icons";



export const sideBar = {
  customer: [
    {
      title: 'User',
      icon: Users()
    },
    {
      title: 'Guarantor',
      icon: GuarantorIcons()
    },
    {
      title: 'Loans',
      icon: LoansIcon()
    },
    {
      title: 'Decision Models',
      icon: HandshakeIcon()
    },
    {
      title: 'Savings',
      icon: SavingsIcon()
    },
    {
      title: 'Loan Requests',
      icon: LoanRequestIcon()
    },
    {
      title: 'Whitelist',
      icon: UserCheckIcon()
    },
    {
      title: 'Karma',
      icon: KarmaIcon()
    },

  ],
  businesses: [
    {
      title: 'Organization',
      icon: Users()
    },
    {
      title: 'Loan Products',
      icon: LoanProductIcon()
    },
    {
      title: 'Savings Products',
      icon: SavingsProductIcon()
    },
    {
      title: 'Fees and Charges',
      icon: FeesIcon()
    },
    {
      title: 'Transactions',
      icon: TransactionIcon()
    },
    {
      title: 'Services',
      icon: ServiceIcon()
    },
    {
      title: 'Service Account',
      icon: ServiceAcctIcon()
    },
    {
      title: 'Settlements',
      icon: settlementIcon()
    },
    {
      title: 'Reports',
      icon: ReportIcon()
    },
    
  ],
  settings: [
    {
      title: 'Preferences',
      icon: Preferences()
    },
    {
      title: 'Fees and Pricing',
      icon: Pricing()
    },
    {
      title: 'Audit Logs',
      icon: AuditLogIcon()
    },
  ]
}
