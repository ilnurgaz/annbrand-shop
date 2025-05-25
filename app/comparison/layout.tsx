import ComparisonLayout from '@/components/layouts/ComparisonLayout'

export const metadata = {
  title: 'Annbrand | Сравнение товаров',
}

export default function ComparisonRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ComparisonLayout>{children}</ComparisonLayout>
}
