interface Props {
    url: string;
    id: string;
    time: string;
    projectName: string;
    icon: string;
    label: string;
    showDetails: any;
}

function ProyectDisplay({ url, time, projectName, icon = 'bxs-right-top-arrow-circle', label, showDetails, id }: Props) {
    const handleClick = (e: any) => {
        showDetails(e);
    };

    return (
        <div 
            className={`flex flex-col lg:flex-row lg:w-[390px] lg:h-[175px] h-[175px] w-[175px] justify-between rounded-3xl p-5 bg-[url('${url}')] bg-cover bg-center border border-[rgba(0,0,0,0.08)] duration-300`} 
            style={{ boxShadow: 'inset 0 0 5px 2px rgba(255, 255, 255, 0.5)' }} // Borde interior blanquito
        >
            <div className="flex h-full w-full lg:w-fit flex-col justify-between">
                <div>
                    <p className="text-sm text-start select-none text-gray-400">{label}</p>
                    <h2 className="text-2xl font-light text-start p-1 select-none text-black">{time}</h2>
                </div>
                <h2 
                    className="self-start rounded-xl bg-white px-3 py-2 font-normal text-black cursor-pointer select-none"
                    onClick={handleClick}
                >
                    {projectName}
                </h2>
            </div>
            <div className="self-end lg:self-start mt-4 lg:mt-0">
                <p className="rounded-full hover:cursor-pointer">
                    <i id={id} onClick={handleClick} className={`text-gray-100 text-2xl bx ${icon}`} />
                </p>
            </div>
        </div>
    );
}

export default ProyectDisplay;
