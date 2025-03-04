import ProtectedLayout from '../layout-protected'

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedLayout>{children}</ProtectedLayout>
}

export default ProfileLayout 