import React from 'react'
import ReactPlayer from 'react-player'
import { IIconProps } from '@fluentui/react'
import { DefaultButton, IconButton, PrimaryButton } from '@fluentui/react/lib/Button'
import { Label } from '@fluentui/react/lib/Label'
import { Stack, IStackTokens, IStackStyles } from '@fluentui/react/lib/Stack'
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField'
import { Toggle } from '@fluentui/react/lib/Toggle'

const WIDTH = 1024
const HEIGHT = 576
const URL_STORAGE = 'url'

const stackTokens: IStackTokens = { childrenGap: 20 }
const stackStyle: IStackStyles = {
    root: {
        width: WIDTH,
        height: HEIGHT
    }
}

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 480 } }

const playIcon: IIconProps = { iconName: 'Play' }

const Player: React.FC = () => {
    const storedUrl = localStorage.getItem(URL_STORAGE) || ''

    const [urlValue, setUrlValue] = React.useState<string>(storedUrl)
    const [urlTextField, setUrlTextField] = React.useState<string>(storedUrl)
    const [hasUrl, setHasUrl] = React.useState<boolean>(false)
    const [stopped, setStopped] = React.useState<boolean>(true)
    const [autoStart, setAutoStart] = React.useState<boolean>(false)

    const textFieldOnChange = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setUrlTextField(newValue || '')
        },
        []
    )

    React.useEffect(() => {
        localStorage.setItem(URL_STORAGE, urlTextField || '')
    }, [urlTextField])

    const autoStartToggleOnChange = (event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
        setAutoStart(!!checked)
        setStopped(!checked)
    }

    const playButtonOnCLick = () => {
        setUrlValue(urlTextField)
        autoStart ? setStopped(false) : setStopped(true)
        setHasUrl(urlValue !== '')
    }

    const startButtonOnClick = () => {
        setStopped(false)
    }

    const stopButtonOnClick = () => {
        setStopped(true)
    }

    return (
        <Stack tokens={stackTokens}>
            <Stack>
                <Label>URL</Label>
                <Stack horizontal tokens={stackTokens}>
                    <Stack horizontal>
                        <TextField
                            value={urlTextField}
                            styles={textFieldStyles}
                            onChange={textFieldOnChange}
                        />
                        <IconButton
                            iconProps={playIcon}
                            title='Play'
                            ariaLabel='Play'
                            disabled={false}
                            checked={true}
                            onClick={playButtonOnCLick}
                        />
                    </Stack>
                    <PrimaryButton text='Stop' onClick={stopButtonOnClick} />
                    <Toggle
                        label='Autostart'
                        inlineLabel
                        disabled={!stopped}
                        onChange={autoStartToggleOnChange}
                    />
                </Stack>
            </Stack>
            <Stack styles={stackStyle} horizontalAlign='center' verticalAlign='center'>
                {hasUrl
                    ? (
                        !autoStart && stopped
                            ? (
                                <DefaultButton text='Click to Start' onClick={startButtonOnClick} />
                            )
                            : stopped
                                ? (
                                    <></>
                                )
                                : (
                                    <ReactPlayer
                                        controls
                                        playing={true}
                                        width={WIDTH}
                                        height={HEIGHT}
                                        url={urlValue}
                                    />
                                )
                    )
                    : (
                        <></>
                    )}
            </Stack>
        </Stack>
    )
}

export default Player
