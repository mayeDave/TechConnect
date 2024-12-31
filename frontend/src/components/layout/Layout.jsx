import Navbar from './Navbar'
import FloatingShape from '../FloatingShape'

const Layout = ({children}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#243b6e] via-[#1e3a8a] to-[#111b30] flex flex-col items-center justify-center relative overflow-hidden">

<FloatingShape color="bg-[#4260b1]" size="w-64 h-64" top="-5%" left="10%" delay={0} />
<FloatingShape color="bg-[#00d9ff]" size="w-48 h-48" top="70%" left="80%" delay={5} />
<FloatingShape color="bg-[#00d9ff]" size="w-32 h-32" top="40%" left="-10%" delay={2} />
<FloatingShape color="bg-[#4260b1]" size="w-48 h-48" top="10%" left="-10%" delay={3} />
<FloatingShape color="bg-[#00d9ff]" size="w-32 h-32" top="60%" left="40%" delay={1} />


        <Navbar />
        
        <main className="max-w-3xl mx-auto w-full px-4 py-6">
            {children}
        </main>
    </div>
  )
}

export default Layout