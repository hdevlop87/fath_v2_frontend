import { useEffect, useRef } from 'react';
import useDialogStore from '@/store/dialogStore';
import { Label } from "@/components/ui/label"
import useGlobalStore from '@/store/dialogStore';
import { motion, AnimatePresence } from 'framer-motion';

const DialogForm = ({ children, description = '', title }) => {

   const { formOpen, setFormOpen } = useDialogStore();
   const { queryLoading } = useGlobalStore();
   const modalRef: any = useRef(null);

   const handleOpenChange = () => {
      setFormOpen(!formOpen);
   };

   const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
         setFormOpen(false);
      }
   };

   useEffect(() => {
      if (!queryLoading) {
         setFormOpen(false)
      }
   }, [queryLoading]);

   return (
      <AnimatePresence>
         {formOpen && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 flex items-center justify-center z-50"
               onClick={handleClickOutside}
            >
               <div className="absolute inset-0 bg-black opacity-60 transition-opacity ease-in-out duration-300"></div>
               <motion.div
                  ref={modalRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-8 rounded-lg w-auto z-10 relative"
               >
                  <button onClick={handleOpenChange} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">
                     ×
                  </button>
                  <div className="flex flex-col gap-2">
                     <Label className="text-lg font-semibold leading-none">{title}</Label>
                     <div className="mb-4">
                        <Label className='text-sm text-muted-foreground'>{description}</Label>
                     </div>
                     {children}
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default DialogForm;
