import Navbar from './Navbar'
import { useThemeStore } from '../../store/useThemeStore';
// import FloatingShape from '../FloatingShape'

const Layout = ({children}) => {
  const { theme } = useThemeStore();
  return (
    
    <div data-theme={theme}>
      {/* Navbar positioned at the to */}
      <Navbar /> 
{/* <FloatingShape color="bg-[#4260b1]" size="w-64 h-64" top="-5%" left="10%" delay={0} />
<FloatingShape color="bg-[#00d9ff]" size="w-48 h-48" top="70%" left="80%" delay={5} />
<FloatingShape color="bg-[#00d9ff]" size="w-32 h-32" top="40%" left="-10%" delay={2} />
<FloatingShape color="bg-[#4260b1]" size="w-48 h-48" top="10%" left="-10%" delay={3} />
<FloatingShape color="bg-[#00d9ff]" size="w-32 h-32" top="60%" left="40%" delay={1} /> */}


        
        
        <main className="max-w-7xl w-full min-h-screen overflow-hidden mx-auto px-4 py-6 ">
            {children}
        </main>
    </div>
  )
}

export default Layout