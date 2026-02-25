import Image from 'next/image';
import notFoundImg from '../../public/not-found.png'

export default function NotFound() {
  return (
    <Image 
      src={notFoundImg.src}
      alt={'404 illusration from https://storyset.com/web'}
      width={750}
      height={750}
    />
  );
}
