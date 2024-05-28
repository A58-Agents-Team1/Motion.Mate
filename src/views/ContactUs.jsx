export default function ContactUs() {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-bold text-4xl'>Contact Us</h1>
      <div className='flex flex-row my-6'>
        <div id='Tisho'>
          <div className='flex flex-col gap-4 w-52 mx-4'>
            <div className='flex gap-4 items-center'>
              <div className='skeleton w-16 h-16 rounded-full shrink-2'></div>
              <div className='flex flex-col gap-4'>
                <div className='skeleton text-center h-7 w-20'>Tihomir</div>
                <div className='skeleton text-center h-7 w-20'>Denev</div>
              </div>
            </div>
            <div className='skeleton h-18 w-full text-center'>
              <p>Text</p>
              <p>Text</p>
              <p>Text</p>
              <hr className='w-full border-2' />
              <div className='flex flex-row justify-center my-2'>
                <button className='btn btn-secondary mx-2'>Call</button>
                <button className='btn btn-secondary mx-2'>Email</button>
              </div>
            </div>
          </div>
        </div>
        <div id='Rado'>
          <div className='flex flex-col gap-4 w-52 mx-4'>
            <div className='flex gap-4 items-center'>
              <div className='skeleton w-16 h-16 rounded-full shrink-2'></div>
              <div className='flex flex-col gap-4'>
                <div className='skeleton text-center h-7 w-20'>Radoslav</div>
                <div className='skeleton text-center h-7 w-20'>Marinov</div>
              </div>
            </div>
            <div className='skeleton h-18 w-full text-center'>
              <p>Text</p>
              <p>Text</p>
              <p>Text</p>
              <hr className='w-full border-2' />
              <div className='flex flex-row justify-center my-2'>
                <button className='btn btn-secondary mx-2'>Call</button>
                <button className='btn btn-secondary mx-2'>Email</button>
              </div>
            </div>
          </div>
        </div>
        <div id='Tisho'>
          <div className='flex flex-col gap-4 w-52 mx-4'>
            <div className='flex gap-4 items-center'>
              <div className='skeleton w-16 h-16 rounded-full shrink-2'></div>
              <div className='flex flex-col gap-4'>
                <div className='skeleton text-center h-7 w-20'>Tanya</div>
                <div className='skeleton text-center h-7 w-20'>Jecheva</div>
              </div>
            </div>
            <div className='skeleton h-18 w-full text-center'>
              <p>Text</p>
              <p>Text</p>
              <p>Text</p>
              <hr className='w-full border-2' />
              <div className='flex flex-row justify-center my-2'>
                <button className='btn btn-secondary mx-2'>Call</button>
                <button className='btn btn-secondary mx-2'>Email</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center text-center my-2'>
        <p>
          Meet the Motion Mate Team! We are passionate about fitness and
          dedicated to helping you achieve your health goals. Whether you have a
          question, need support, or just want to share your fitness journey,
          we`re here to help. Get in touch with us and let`s move towards a
          healthier future together!
        </p>
      </div>
    </div>
  );
}
