import { useEffect, useRef } from 'react';
import useDialogStore from '@/store/dialogStore';
import { Icon } from '@iconify/react';
import useGlobalStore from '@/store/dialogStore';
import { motion, AnimatePresence } from 'framer-motion';

const DialogForm = ({ children }) => {

   const { formOpen, setFormOpen } = useDialogStore();
   const modalRef: any = useRef(null);

   const handleOpenChange = () => {
      setFormOpen(!formOpen);
   };

   return (
      <AnimatePresence>
         {formOpen && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 flex items-center justify-center z-50"
            >
               <div ref={modalRef} className="absolute inset-0 bg-black opacity-60 transition-opacity ease-in-out duration-300"></div>
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-6 rounded-lg w-auto z-10 relative"
               >
                  <button onClick={handleOpenChange} className="absolute -top-4 -right-4  hover:text-gray-600 bg-white rounded-full">
                     <Icon icon="carbon:close-filled" className='w-8 h-8 text-primary'/>
                  </button>
                  <div className="flex flex-col gap-2">
                     {children}
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default DialogForm; 
