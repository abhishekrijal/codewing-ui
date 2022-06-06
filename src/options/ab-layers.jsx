import {
    Component,
    createContext,
    useState
} from 'react'
import arrayMove from 'array-move'
import classnames from 'classnames'
import _ from 'underscore';
import nanoid from 'nanoid'
import {
    SortableContainer,
    SortableElement
} from 'react-sortable-hoc'
import { getValueFromInput } from '../helpers/get-value-from-input'
import LayerControls from './ab-layers/LayerControls'
import SelectThatAddsItems from './ab-layers/SelectThatAddsItems'

const valueWithUniqueIds = (value) =>
    _.toArray(value).map((singleItem) => ({
        ...singleItem,

        ...(singleItem.__id
            ? {}
            : {
                __id: nanoid(),
            }),
    }))

export const itemsThatAreNotAdded = (value, option) =>
    Object.keys(option.settings).filter(
        (optionId) => !value.find(({ id }) => id === optionId)
    )

const getDefaultState = () => ({
    currentlyPickedItem: null,
    isDragging: false,
    isOpen: false,
})

export const LayersContext = createContext(getDefaultState())

const { Provider, Consumer } = LayersContext

class SingleItem extends Component {
    state = {
        isOpen: false,
    }

    render() {
        const { value, items, onChange } = this.props

        return (
            <Consumer>
                {({ option, isDragging, isOpen, parentValue }) => (
                    <li
                        className={classnames('ct-layer', option.itemClass, {
                            [`ct-disabled`]: !{ enabled: true, ...value }
                                .enabled,
                            'ct-layer-isdragging': isDragging,
                        })}>
                        <LayerControls
                            items={items}
                            onChange={onChange}
                            value={value}
                        />

                        {option.settings[value.id] &&
                            option.settings[value.id].options &&
                            isOpen === value.__id &&
                            (!isDragging ||
                                (isDragging && isDragging !== isOpen)) && (
                                <div className="ct-layer-content">

                                </div>
                            )}
                    </li>
                )}
            </Consumer>
        )
    }
}

const SortableItem = SortableElement(SingleItem)

const SortableList = SortableContainer(({ items, onChange }) => (
    <Consumer>
        {({ option }) => (
            <ul className="ct-layers">
                {items.map((value, index) => (
                    <SortableItem
                        key={value.__id}
                        index={index}
                        onChange={onChange}
                        value={value}
                        items={items}
                        disabled={!!option.disableDrag}
                    />
                ))}
            </ul>
        )}
    </Consumer>
))

const Layers = ({ value, option, onChange, values }) => {
    const [state, setState] = useState(getDefaultState())

    const addForId = (idToAdd, val = {}) => {
        onChange([
            ...(_.toArray(value) || []),
            {
                id: idToAdd,
                enabled: true,
                ...getValueFromInput(
                    option.settings[idToAdd].options || {},
                    {}
                ),
                ...val,
                __id: nanoid(),
            },
        ])
    }

    const computedValue = option.manageable
        ? valueWithUniqueIds(value)
        : [
            ...valueWithUniqueIds(value),
            ...option.value
                .filter(
                    ({ id }) => value.map(({ id }) => id).indexOf(id) === -1
                )
                .map((item) => ({
                    ...item,
                    enabled: false,
                })),
        ]

    return (
        <Provider
            value={{
                ...state,
                parentValue: values,
                addCurrentlySelectedItem: () => {
                    const idToAdd =
                        state.currentlyPickedItem ||
                        itemsThatAreNotAdded(
                            valueWithUniqueIds(value),
                            option
                        )[0]

                    setState((state) => ({
                        ...state,
                        currentlyPickedItem: null,
                    }))
                    addForId(idToAdd)
                },
                addForId: (id, value) => addForId(id, value),
                option: option,
                setCurrentItem: (currentlyPickedItem) =>
                    setState((state) => ({ ...state, currentlyPickedItem })),
                removeForId: (idToRemove) =>
                    onChange(
                        valueWithUniqueIds(value).filter(
                            ({ __id: id }) => id !== idToRemove
                        )
                    ),

                toggleOptionsPanel: (idToAdd) => {
                    if (value.length > 0 && !value[0].__id) {
                        wp.customize &&
                            wp.customize.previewer &&
                            wp.customize.previewer.send(
                                'ct:sync:refresh_partial',
                                {
                                    shouldSkip: true,
                                }
                            )

                        onChange(computedValue)
                    }

                    setState((state) => ({
                        ...state,
                        isOpen: state.isOpen === idToAdd ? false : idToAdd,
                    }))
                },
            }}>
            {option.manageable && (
                <SelectThatAddsItems
                    {...{
                        value: computedValue,
                        option,
                    }}
                />
            )}

            <SortableList
                useDragHandle
                distance={3}
                lockAxis="y"
                items={computedValue}
                onChange={(v) => onChange(v)}
                helperContainer={() =>
                    document.querySelector('#customize-theme-controls') ||
                    document.body
                }
                onSortEnd={({ oldIndex, newIndex }) => {
                    onChange(arrayMove(computedValue, oldIndex, newIndex))

                    setState((state) => ({
                        ...state,
                        isDragging: false,
                    }))
                }}
                updateBeforeSortStart={({ index }) => {
                    new Promise((resolve) => {
                        if (value.length > 0 && !value[0].__id) {
                            wp.customize &&
                                wp.customize.previewer &&
                                wp.customize.previewer.send(
                                    'ct:sync:refresh_partial',
                                    {
                                        shouldSkip: true,
                                    }
                                )
                            onChange(computedValue)
                        }

                        setState((state) => ({
                            ...state,
                            isDragging: computedValue[index].__id,
                        }))
                        resolve()
                    })
                }}
            />
        </Provider>
    )
}

export default Layers
