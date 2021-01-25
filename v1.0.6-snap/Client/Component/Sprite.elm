module Client.Component.Sprite exposing (Sprite, empty, spec)

import Logic.Component as Component


type Sprite
    = Item
    | Anim


spec : Component.Spec Sprite { world | sprite : Component.Set Sprite }
spec =
    Component.Spec .sprite (\comps world -> { world | sprite = comps })


empty : Component.Set Sprite
empty =
    Component.empty
