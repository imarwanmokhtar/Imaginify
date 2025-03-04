import ProtectedLayout from '../layout-protected'

const CreditsLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedLayout>{children}</ProtectedLayout>
}

export default CreditsLayout 