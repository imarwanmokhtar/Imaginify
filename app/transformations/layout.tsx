import ProtectedLayout from '../layout-protected'

const TransformationsLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedLayout>{children}</ProtectedLayout>
}

export default TransformationsLayout 