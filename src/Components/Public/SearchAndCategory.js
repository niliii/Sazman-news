import HotCategorySection from "@/Components/Public/HotCategorySection";
import SearchInputSection from "@/Components/Public/SearchInputSection";
export default function SearchAndCategory(){
    return(
        <div className={"container mt-4"}>
            <div className="d-flex flex-row flex-wrap justify-content-between gap-2">
                <HotCategorySection></HotCategorySection>
                <SearchInputSection></SearchInputSection>
            </div>
        </div>

    )
}