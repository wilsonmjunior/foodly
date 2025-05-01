import Image from 'next/image';

import BannerPng from '@/presentation/assets/banner.png';

export function Banner() {
    return (
        <div className="2xl:px-5">
            <Image src={BannerPng} alt="Promo banner" className="w-full" />
        </div>
    );
}
