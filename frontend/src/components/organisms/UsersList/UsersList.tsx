import { useState } from 'react';
import db_requests, { IUserKeys } from '../../../shared/db/db_requests';
import { theme } from '../../../shared/theme/theme';
import ListItem from '../../atoms/ListItem';
import { StyledListItem } from '../../atoms/ListItem/style';
import { StyledUsersList, StyledUsersMessage } from './styles';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Pagination from '../../molecules/Pagination';
import { SearchContext } from '../../../App';
import { useContext } from 'react';
import { ModalContext } from '../../../App';
import Loader from '../../atoms/Loader';

export interface IUsersListEmpty {
    isEmpty: boolean;
}

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const query: UseQueryResult<IUserKeys[], Error> = useQuery({
        queryKey: ['users'],
        queryFn: async () => await db_requests.getAllUsers(),
    });

    const { setIsOpen } = useContext(ModalContext);

    const { searchValue } = useContext(SearchContext);

    const { data, isError, isLoading } = query;

    const usersPerPage = 10;
    const pageIndex = currentPage * usersPerPage;

    const searchInData = (data: IUserKeys[] | undefined, searchValue: string) => {
        if (!searchValue) return data;

        if (data) {
            const filteredUsers: IUserKeys[] | undefined = data?.filter((user) => {
                for (const key of Object.keys(user)) {
                    if ((user[key] as string).toString().includes(searchValue) && key != '_id' && key != 'createdAt' && key != 'updatedAt') {
                        return user;
                    }
                }
            });

            if (filteredUsers && filteredUsers.length) return filteredUsers;

            return false;
        }
    };

    const emptyListMessage = (
        <StyledUsersMessage>
            <span className='headline-message'>{`${searchValue ? 'Vartotojų neradome.' : 'Vartotojų nėra.'}`}</span>
            <span className='link-message' onClick={() => setIsOpen(() => true)}>
                Pridėkite naują vartotoją.
            </span>
        </StyledUsersMessage>
    );

    const errorMessage = <p style={{ margin: 'auto' }}>Kažkas ne taip. Pabandykite vėliau.</p>;

    const usersData = data ? (searchInData(data, searchValue as string) as IUserKeys[]) : false;
    const pages = usersData && Math.ceil(usersData?.length / usersPerPage);

    useEffect(() => {
        if (data && data.length) !data?.slice(currentPage * usersPerPage).length && setCurrentPage((prev) => prev - 1);
    }, [data, currentPage, usersPerPage]);

    useEffect(() => {
        setCurrentPage(() => 0);
    }, [searchValue]);

    console.log(query);

    if (isError) return errorMessage;

    if (isLoading) return <Loader iconSize='36px' fullScreen theme={theme} />;

    if (!pages) return emptyListMessage;

    if (usersData) {
        return (
            <StyledUsersList isEmpty={pages && pages <= 0 ? true : false}>
                {usersData && usersData.length && pages > 1 && (
                    <Pagination
                        mobileClass='mobile-pagination'
                        currentPage={currentPage}
                        theme={theme}
                        pages={pages}
                        onPaginationClick={setCurrentPage}
                    />
                )}

                {!isError && pages && pages > 0 && (
                    <>
                        <StyledListItem theme={theme} className='table-row table-heading-wrapper'>
                            <div className='user-info-wrapper'>
                                <div className='table-column'>
                                    <p className={'vardas heading-text'}>Vardas</p>
                                </div>
                                <div className='table-column'>
                                    <p className={'pavarde heading-text'}>Pavardė</p>
                                </div>
                                <div className='table-column'>
                                    <p className={'email heading-text'}>El. Paštas</p>
                                </div>
                                <div className='table-column'>
                                    <p className={'age heading-text'}>Amžius</p>
                                </div>
                            </div>
                            <div className='user-edit-wrapper'></div>
                        </StyledListItem>

                        {usersData &&
                            usersData.length &&
                            usersData?.slice(pageIndex).map((user, index) => {
                                if (index < usersPerPage) {
                                    return <ListItem key={user._id} theme={theme} data={user} />;
                                }
                            })}

                        {usersData && usersData.length && pages > 1 && (
                            <Pagination currentPage={currentPage} theme={theme} pages={pages} onPaginationClick={setCurrentPage} />
                        )}
                    </>
                )}
            </StyledUsersList>
        );
    }
};

export default UsersList;
