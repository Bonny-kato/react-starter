import SpinLoader from "@/components/loaders/spinner";

const Loader = () => {
    return (
        <div className={"h-96 flex-col space-y-5 center"}>
            <SpinLoader className={""} />
            <p className={"text-sm text-black/60"}>Please Wait..</p>
        </div>
    );
};
export default Loader;
