import Image from 'next/image';
import { HeaderWithBack, Icon } from '@/presentation/components';
import { MenuItem } from '@/presentation/components/Screens/Profile';

export default function ProfileScreen() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <HeaderWithBack />

            <div className="bg-white rounded-xl mx-4 p-6 mt-4 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 overflow-hidden border-4 border-white shadow">
                    <Image
                        src="/api/placeholder/150/150"
                        alt="Avatar do usuário"
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                    />
                </div>

                <h2 className="text-xl font-semibold text-center mb-1">John Doe</h2>
                <p className="text-gray-500 text-sm mb-4">john.doe@email.com</p>
            </div>

            <div className="bg-white rounded-xl mx-4 mt-4 shadow">
                <MenuItem
                    icon={<Icon name="Gear" size={22} className="text-primary-700" weight="bold" />}
                    title="configurações"
                    href=""
                />
                <MenuItem
                    icon={
                        <Icon name="Heart" size={22} className="text-primary-700" weight="bold" />
                    }
                    title="produtos favoritos"
                    href="/favorites"
                />
                <MenuItem
                    icon={
                        <Icon name="SignOut" size={22} className="text-primary-700" weight="bold" />
                    }
                    title="sair"
                    href=""
                />
            </div>

            <div className="mt-auto p-4">
                <p className="text-gray-400 text-xs text-center">Versão 1.0.0</p>
            </div>
        </div>
    );
}
