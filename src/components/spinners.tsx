export function LoadingSpinner() {
  return (
    //   stolen from https://tailwindflex.com/@anonymous/loading-dots
    <div className='flex flex-col space-x-2 justify-center items-center h-screen'>
      <span className='sr-only'>Loading...</span>
      <div className='h-6 w-6 bg-on-bg rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-6 w-6 bg-on-bg rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-6 w-6 bg-on-bg rounded-full animate-bounce'></div>
    </div>
  );
}
export function LoadingScreen() {
  return (
    <div
      className='absolute flex
    justify-center items-center top-0 left-0 w-screen h-screen bg-bg-transparent backdrop-blur-lg'
    >
      <div className=' space-x-2  mt-[12vh] items-center '>
        <span className='sr-only'>Loading...</span>
        <div className='h-6 w-6 bg-on-bg rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-6 w-6 bg-on-bg rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-6 w-6 bg-on-bg rounded-full animate-bounce'></div>
      </div>
    </div>
  );
}
