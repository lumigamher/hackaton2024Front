interface Props {
    url: string,
    id: string
    time: string;
    projectName: string;
    icon: string,
    label: string,
    showDetails: any
}

function ProyectDisplay({ url, time, projectName, icon = 'bxs-right-top-arrow-circle', label, showDetails, id }: Props) {


    const handleClick= (e: any) => {
        showDetails(e)
        
    }

    return (
        <div className={`flex h-[175px] lg:w-[380px]  bg-gray-100 justify-between rounded-3xl p-5 bg-[url('${url}')] bg-cover bg-center`}>
            <div className="flex h-full w-fit flex-col  justify-between ">
                <div>
                    <p className="text-sm text-start text-gray-400">{label}</p>
                    <h2 className="text-2xl font-light text-center text-white">{time}</h2>
                </div>
                <h2 className="hover:scale-105 duration-300 hover:cursor-pointer hover:bg-slate-100 self-start rounded-xl bg-white px-3 py-2 font-normal">
                    {projectName}
                </h2>
            </div>
            <div>
                <p className="rounded-full hover:cursor-pointer">
                    <i id={id} onClick={handleClick} className={`text-gray-400 text-2xl bx ${icon}`} />
                </p>
            </div>
        </div>
    );
}

export default ProyectDisplay;
