import type Car from '../Models/Car';

export default function ImageSlider(props: { files: any; product: Car }) {
  return props.files?.map((file: any) => (
    <div className='w-auto h-full aspect-video'>
      <img
        className='object-cover w-full h-full'
        src={file.url}
        alt={`${
          props.product.title || props.product.make + ' ' + props.product.model
        } (car)`}
      />
    </div>
  ));
}
