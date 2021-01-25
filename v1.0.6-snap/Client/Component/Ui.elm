module Client.Component.Ui exposing (Ui, empty, spec)

import Common.Util as Util


type alias Ui =
    { activeElement : String
    }


spec : Util.Spec Ui { world | ui : Ui }
spec =
    Util.Spec .ui (\comps world -> { world | ui = comps })


empty : Ui
empty =
    { activeElement = ""
    }
