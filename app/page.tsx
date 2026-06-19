import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import conversion from '@/utils/import/conversion'
import updateTable from '@/utils/import/updateTable'
import UserInputForm from './components/userInput'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  return (
    <>
      <UserInputForm/>
    </>
  )
}