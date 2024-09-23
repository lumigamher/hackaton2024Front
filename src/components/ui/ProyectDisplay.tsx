interface Props {
    url: string;
    time: string;
    proyectName: string;
    icon: string,
    label: string
}

function ProyectDisplay({ url, time, proyectName, icon = 'bxs-right-top-arrow-circle', label }: Props) {
    return (
        <div className={`flex h-[175px] w-[380px] bg-gray-200 justify-between rounded-3xl p-5 bg-[url('${url}')] bg-cover bg-center`}>
            <div className="flex h-full w-fit flex-col items-center justify-between text-center">
                <div>
                    <p className="text-sm text-gray-200">{label}</p>
                    <h2 className="text-2xl font-light text-white">{time}</h2>
                </div>
                <h2 className="hover:scale-105 duration-300 hover:cursor-pointer hover:bg-slate-100 self-start rounded-xl bg-white px-3 py-2 font-normal">
                    {proyectName}
                </h2>
            </div>
            <div>
                <p className="rounded-full hover:cursor-pointer">
                    <i className={`text-gray-400 text-2xl bx ${icon}`} />
                </p>
            </div>
        </div>
    );
}

export default ProyectDisplay;
