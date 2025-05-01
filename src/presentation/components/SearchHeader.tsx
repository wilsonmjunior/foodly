import { Icon } from './Icon';

export function SearchHeader() {
    return (
        <div className="w-full flex justify-center items-center py-2 bg-primary-700">
            <div className="flex items-center w-full max-w-xl bg-white rounded-xl shadow px-4 py-2">
                <Icon name="MagnifyingGlass" size={28} className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="busque pela loja ou culinária"
                    className="flex-1 bg-transparent outline-none text-lg text-gray-700 placeholder-gray-400"
                />
            </div>
        </div>
    );
}
