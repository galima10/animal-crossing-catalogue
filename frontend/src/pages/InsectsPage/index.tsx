import { API_PATH } from "@/constants/apiPath";
import ItemsList from "@/components/organisms/ItemsList";
import NavArrowButtons from "@/components/molecules/NavArrowButtons";

export default function InsectsPage(){
    return (
        <main>
            <ItemsList path={API_PATH.insect} />
            <NavArrowButtons />
        </main>
    );
};
