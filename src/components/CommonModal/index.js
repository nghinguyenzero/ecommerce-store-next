'use client'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";

export default function CommonModal({
    modalTitle, mainContent, showButtons, 
    buttonComponent, show, setShow,
    showModalTitle
}) {
    return (
        <Transition show={show}>
            <Dialog as='div' className={'relative z-10'} onClose={setShow}>
                <TransitionChild
                    enter="ease-in-out duration-900"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                 >
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity"></div>

                </TransitionChild>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute indent-0 overflow-hidden">
                        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <TransitionChild
                                enter="ease-in-out duration-900"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <DialogPanel className='w-screen  max-w-md'>
                                    <div className="flex  h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            {
                                                showModalTitle ? 
                                                <div className="flex items-start justify-between">
                                                    <DialogTitle>{modalTitle}</DialogTitle>
                                                </div>: null
                                            }
                                            <div className="mt-20">
                                                {mainContent}
                                            </div>
                                        </div>
                                        {
                                            showButtons ? 
                                            <div className="border-none px-4 py-6 sm:px-6">
                                                {buttonComponent}
                                            </div> : null
                                        }
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}