const Loader = () => (
  <div className='mt-5'>
    <div className='spinner-grow text-dark' style={{ width: '10rem', height: '10rem' }} role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
    <div className='spinner-grow text-info' style={{ width: '10rem', height: '10rem' }} role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
    <div className='spinner-grow text-secondary' style={{ width: '10rem', height: '10rem' }} role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
    <div className='spinner-grow text-warning' style={{ width: '10rem', height: '10rem' }} role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
    <div>Loading...</div>
  </div>
);

export default Loader;
