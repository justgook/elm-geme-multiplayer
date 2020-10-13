module WebGL.Ui.AutoLayout.BVH exposing (AABB, BVH, find, init, insert, union)

{-|

[1]: https://www.azurefromthetrenches.com/introductory-guide-to-aabb-tree-collision-detection/ "Introductory Guide to AABB Tree Collision Detection"
[2]: https://box2d.org/files/ErinCatto_DynamicBVH_GDC2019.pdf "BVH presentation by author of Box2d"

-}


type alias AABB =
    { minX : Int
    , maxX : Int
    , minY : Int
    , maxY : Int
    }


{-| Bounding Volume Hierarchy
-}
type BVH data
    = Branch Int AABB (BVH data) (BVH data)
    | Leaf data AABB


init : data -> AABB -> BVH data
init =
    Leaf


find : { a | x : Int, y : Int } -> BVH data -> Maybe data
find point tree =
    if isPointInsideAABB point (getAABB tree) then
        case tree of
            Leaf a _ ->
                Just a

            Branch _ _ left right ->
                let
                    isLeft =
                        find point left
                in
                if isLeft == Nothing then
                    find point right

                else
                    isLeft

    else
        Nothing


isPointInsideAABB : { a | x : Int, y : Int } -> AABB -> Bool
isPointInsideAABB point box =
    (point.x >= box.minX && point.x <= box.maxX) && (point.y >= box.minY && point.y <= box.maxY)


union : BVH data -> BVH data -> BVH data
union bvh1 bvh2 =
    Debug.todo "Implement me"


insert : data -> AABB -> BVH data -> BVH data
insert itemData itemAABB tree =
    case tree of
        Leaf _ a ->
            Branch 2 (sum a itemAABB) tree (Leaf itemData itemAABB)

        Branch count treeAabb left right ->
            let
                newBranch l r =
                    Branch (count + 1) (sum treeAabb itemAABB) l r
            in
            case ( left, right ) of
                ( Leaf _ a, _ ) ->
                    newBranch (Branch 2 (sum a itemAABB) left (Leaf itemData itemAABB)) right

                ( _, Leaf _ a ) ->
                    newBranch left (Branch 2 (sum a itemAABB) (Leaf itemData itemAABB) right)

                ( Branch count1 _ _ _, Branch count2 _ _ _ ) ->
                    if count1 < count2 then
                        newBranch (insert itemData itemAABB left) right

                    else
                        newBranch left (insert itemData itemAABB right)


sum : AABB -> AABB -> AABB
sum a b =
    { minX = min a.minX b.minX
    , maxX = max a.maxX b.maxX
    , minY = min a.minY b.minY
    , maxY = max a.maxY b.maxY
    }


getAABB : BVH data -> AABB
getAABB tree =
    case tree of
        Branch _ aabb _ _ ->
            aabb

        Leaf _ aabb ->
            aabb
