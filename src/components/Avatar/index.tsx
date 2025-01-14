export default function Avatar({ProfileAvatarUrl} : {ProfileAvatarUrl : string}) {

    return (
        <div className="rounded-full h-[128px] w-[128px] top-32 left-4 absolute border-4 border-black overflow-hidden flex justify-center items-center">
            <img
                src={ProfileAvatarUrl}
                className="h-full w-full object-cover" />
        </div>
    )
}