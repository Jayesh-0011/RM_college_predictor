import UserInputForm from './components/userInput'
import Footer from './components/footer'
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <UserInputForm />

      <div className="mt-auto py-4 text-center">
        <Footer />
      </div>
    </div>
  )
}