import LoginForm from "../../../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <LoginForm mode="login" />
    </div>
  );
}
