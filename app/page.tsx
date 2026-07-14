import UserInputForm from './components/userInput'
import Footer from './components/footer'
import StateFilter from './components/stateFilter'
export default function Page() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="mx-auto flex  gap-8 p-8 items-start">
        <StateFilter />
        <UserInputForm />
      </div>

      <div className="py-4 text-center">
        <Footer />
      </div>
    </div>
  )
}