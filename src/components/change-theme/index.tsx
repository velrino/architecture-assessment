import { Switch } from "antd";
import { Trans } from "react-i18next";
import { Emitter } from "../../utils/emitter";
import { useState } from "react";

export function ChangeThemeComponent() {
    let [theme, setTheme] = useState<boolean>(false)

    const updateTheme = () => {
        const currentTheme = !(theme)
        setTheme(currentTheme)
        Emitter.EventEmitter.emit(Emitter.Event.Action.ChangeTheme, currentTheme)
    }

    return <>
        <Switch
            checkedChildren={<Trans i18nKey="theme.dark" />}
            unCheckedChildren={<Trans i18nKey="theme.light" />}
            checked={theme}
            size='default'
            className='switch-custom'
            onChange={updateTheme}
        />
    </>
}