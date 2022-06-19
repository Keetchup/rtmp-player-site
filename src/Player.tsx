import React from 'react'
import ReactPlayer from 'react-player'
import { IIconProps } from '@fluentui/react'
import { IconButton } from '@fluentui/react/lib/Button'
import { Label } from '@fluentui/react/lib/Label'
import { Stack, IStackTokens, IStackStyles } from '@fluentui/react/lib/Stack'
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField'

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
    const [urlTextField, setUrlTetxField] = React.useState<string>(storedUrl)
    const [hasUrl, setHasUrl] = React.useState<boolean>(false)

    const textFieldOnChange = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setUrlTetxField(newValue || '')
        },
        []
    )

    React.useEffect(() => {
        localStorage.setItem(URL_STORAGE, urlTextField || '')
    }, [urlTextField])

    const playButtonOnCLick = () => {
        setUrlValue(urlTextField)
        setHasUrl(urlValue !== '')
    }

    return (
        <Stack tokens={stackTokens}>
            <Stack>
                <Label>URL</Label>
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
            </Stack>
            <Stack styles={stackStyle} horizontalAlign='center' verticalAlign='center'>
                {hasUrl
                    ? (
                        <ReactPlayer controls width={WIDTH} height={HEIGHT} url={urlValue}/>
                    )
                    : (
                        <></>
                    )}
            </Stack>
        </Stack>
    )
}

export default Player
