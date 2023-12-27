export function LoadingSpinner() {
  return (
    //   stolen from https://tailwindflex.com/@anonymous/loading-dots
    <div className='flex space-x-2 justify-center items-center h-screen'>
      <span className='sr-only'>Loading...</span>
      <div className='h-6 w-6 bg-on-bg rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-6 w-6 bg-on-bg rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-6 w-6 bg-on-bg rounded-full animate-bounce'></div>
    </div>
  );
}
