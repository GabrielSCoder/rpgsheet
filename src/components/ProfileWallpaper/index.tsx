export default function ProfileWallpaper({backgroundUrl} : {backgroundUrl : string}) {
    
    return (
        <>
            <div className="w-full">
                <img src={backgroundUrl} className="object-cover h-[200px] w-full z-0" />
            </div>
        </>
    )
}