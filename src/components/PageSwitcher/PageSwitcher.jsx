import { Page, Pages } from "./PageSwitcher.styled"

export const PageSwitcher = ({pages}) => {
    return (
        <Pages>
            {pages.map(p => (
                <Page key={p.text} to={p.url} replace>
                    {p.text}
                </Page>
            ))}
        </Pages>
    )
}