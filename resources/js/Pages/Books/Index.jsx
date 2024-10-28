import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import BlueButton from '@/Components/BlueButton';
import GreenButton from '@/Components/GreenButton';
import TextareaInput from '@/Components/TextareaInput';
import Select from '@/Components/Select';
import Pagination from "@/Components/Pagination";

// DOM (Document Object Model)
// 目的: ウェブページやXML文書の構造をプログラムから操作するためのインターフェースを提供します。
// 機能: HTMLやXML文書の要素、属性、テキストなどを操作し、ドキュメントの内容や構造を変更できます。
// 使用例: JavaScriptや他のプログラミング言語を使って、ウェブページの内容を動的に変更したり、フォームのデータを取得したりする際に使用します。

export default function Dashboard({ auth, message, booksPaginator }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);//useState(false) で初期状態を false に設定
    const [confirmingBookUpdate, setConfirmingBookUpdate] = useState(false);//更新関数: set...は状態を変更するために使用
    const [confirmingBookDelete, setConfirmingBookDelete] = useState(false);//追加
    const [bookToDelete, setBookToDelete] = useState(null);//追加
    const [bookTitleToDelete, setBookTitleToDelete] = useState('');//追加
    const [price, setPrice] = useState(''); // price の状態を追加
    const passwordInput = useRef();//useRef() でフォームの入力フィールドの値を保持できますが、変更がレンダリングに影響を与えない点に注意
    const titleInput = useRef();
    const contentInput = useRef();
    const categoryInput = useRef();
    const priceInput = useRef(); // priceInput を追加


    // booksPaginatorのdataプロパティからデータを取得
    const books = booksPaginator.data;

    const {//const の中身にはメソッドと変数が含まれている
        data,
        setData,
        delete: destroy, // destroy は予約語として使用されるため、delete という名前で利用,予約語との衝突を避ける,delete は JavaScript の予約語であるため、destroy という名前で別名（エイリアス）を付けて利用
        post, put,
        processing,
        reset,
        errors,
    } = useForm({//useForm はフックそのもの
        password: '', title: '', content: '', category: '', price: ''
    });

    const confirmUserDeletion = () => {//ユーザー削除の確認ダイアログを表示するために、confirmingUserDeletionをtrueに設定
        setConfirmingUserDeletion(true);
    };

    const confirmBookUpdate = (id, title, content, category, price) => {
        setData({ id, title, content, category, price });//setData関数は、useFormフックから提供されるもので、フォームデータを設定するために使用します
        // ここでは、引数として渡されたid、title、content、categoryを使用して、フォームのデータを設定します。
        setConfirmingBookUpdate(true);//setConfirmingBookUpdateは、ReactのuseStateフックから提供される関数で、confirmingBookUpdateという状態を設定します。
        // ここでは、setConfirmingBookUpdate(true)を呼び出すことで、confirmingBookUpdateをtrueに設定し、更新確認モーダルを表示する準備
    };
    // 本の削除を確認するダイアログを表示するために、削除する本のidをsetBookToDeleteで設定し、confirmingBookDeleteをtrueに設定
    const confirmBookDelete = (id, title) => {//追加
        setBookToDelete(id);
        setBookTitleToDelete(title); // タイトルも設定
        console.log('削除対象のタイトル:', title); // コンソールに出力
        setConfirmingBookDelete(true);
    };

    const deleteUser = (e) => {
        // ユーザーを削除するための関数です。
        // フォーム送信を防止し、Inertia.jsのpostメソッドを使ってユーザー削除リクエストを送信します。
        // 削除後にモーダルを閉じ、入力フィールドをリセットします。

        e.preventDefault(); // フォームのデフォルトの送信動作を防ぎます。

        post(route('books.store'), { // 本を保存するためのルートにPOSTリクエストを送信しています。
            preserveScroll: true, // ページスクロールの位置を保持します。
            onSuccess: () => closeModal(), // リクエストが成功したらモーダルを閉じます。
            onError: () => passwordInput.current.focus(), // エラー時にパスワード入力フィールドにフォーカスします。
            onFinish: () => reset(), // リクエストが完了したらフォームをリセットします。
        });
    };


    const updateBook = (e) => {
        // 本を更新するための関数です。
        // フォーム送信を防止し、Inertia.jsのputメソッドを使って本の更新リクエストを送信します。
        // 更新後にモーダルを閉じ、入力フィールドをリセットします。

        e.preventDefault(); // フォームのデフォルトの送信動作を防ぎます。

        put(route('books.update', data.id), { // 'books.update'ルートにPUTリクエストを送信し、更新する本のIDを指定します。
            preserveScroll: true, // ページスクロールの位置を保持します。
            onSuccess: () => closeModal_u(), // リクエストが成功したらモーダルを閉じます。
            onError: () => passwordInput.current.focus(), // エラー時にパスワード入力フィールドにフォーカスします。
            onFinish: () => reset(), // リクエストが完了したらフォームをリセットします。
        });
    };


    const deleteBook = (id) => {
        // 本を削除するための関数です。
        // Inertia.jsのdestroyメソッドを使って本の削除リクエストを送信します。
        // 削除後にフォームをリセットします。

        destroy(route('books.destroy', id), { // 'books.destroy'ルートにDELETEリクエストを送信し、削除する本のIDを指定します。
            preserveScroll: true, // ページスクロールの位置を保持します。
            onFinish: () => reset(), // 完了時にフォームをリセットします。
        });
    };


    const deleteBookConfirmed = (e) => {
        // 削除確認後に本を削除するための関数です。
        e.preventDefault(); // フォームのデフォルトの送信動作を防ぎます。

        if (bookToDelete) { // 削除対象の本が設定されている場合
            deleteBook(bookToDelete); // 指定された本を削除するための関数を呼び出します。
        }
        closeModal_d(); // 削除確認モーダルを閉じます。
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);// ユーザー削除確認モーダルの表示状態を閉じます
        reset();// フォームフィールドをリセットします
    };

    const closeModal_u = () => {// 本の更新確認モーダルの表示状態を閉じます
        setConfirmingBookUpdate(false);
        reset();// フォームフィールドをリセット
    };

    const closeModal_d = () => {
        setConfirmingBookDelete(false);// 本削除確認モーダルの表示状態を閉じます
        setBookToDelete(null);// 削除対象の本のIDをリセットします
        setBookTitleToDelete('');
        reset();// フォームフィールドをリセット
    };

    const handleDelete = (id, title) => {
        setBookToDelete(id);
        setBookTitleToDelete(title);
        console.log('削除対象のタイトル:', title); // コンソールで確認
    };

    const BookList = ({ books }) => {
        const formatPrice = (price) => {
            return new Intl.NumberFormat('ja-JP').format(price);
        };
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ja-JP').format(price);
    };
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Books</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <BlueButton onClick={confirmUserDeletion}>登録</BlueButton>
                    {/* モーダル追加 */}
                    <Modal show={confirmingUserDeletion} onClose={closeModal}>
                        <form onSubmit={deleteUser} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                新しい本を登録してもよろしいですか?
                            </h2>

                            <div className="mt-6">
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    ref={titleInput}
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-3/4"
                                    isFocused
                                    placeholder="title"
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div className="mt-6">
                                <TextareaInput
                                    id="content"
                                    type="text"
                                    name="content"
                                    ref={contentInput}
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="mt-1 block w-3/4"
                                    placeholder="content"
                                >
                                </TextareaInput>
                                <InputError message={errors.content} className="mt-2" />
                            </div>
                            <div className="mt-6">
                                <Select
                                    id="category"
                                    name="category"
                                    ref={categoryInput}
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="mt-1 block w-3/4"
                                    placeholder="category"
                                    options={['文芸書', '実用書', 'ビジネス書', '児童書', '専門書']}
                                >
                                </Select>
                                <InputError message={errors.category} className="mt-2" />
                            </div>

                            <div className="mt-6">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Price
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    ref={priceInput}
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1 block w-3/4"
                                    placeholder="price"
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>取消</SecondaryButton>
                                <BlueButton className="ml-3" disabled={processing}>
                                    登録する
                                </BlueButton>
                            </div>
                        </form>
                    </Modal>

                    <Modal show={confirmingBookUpdate} onClose={closeModal_u}>
                        <form onSubmit={updateBook} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                この本を更新してもよろしいですか?
                            </h2>

                            <div className="mt-6">
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    ref={titleInput}
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-3/4"
                                    isFocused
                                    placeholder="title"
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div className="mt-6">
                                <TextareaInput
                                    id="content"
                                    type="text"
                                    name="content"
                                    ref={contentInput}
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="mt-1 block w-3/4"
                                    placeholder="content"
                                >
                                </TextareaInput>
                                <InputError message={errors.content} className="mt-2" />
                            </div>
                            <div className="mt-6">
                                <Select
                                    id="category"
                                    name="category"
                                    ref={categoryInput}
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="mt-1 block w-3/4"
                                    placeholder="category"
                                    options={['文芸書', '実用書', 'ビジネス書', '児童書', '専門書']}
                                >
                                </Select>
                                <InputError message={errors.category} className="mt-2" />
                            </div>

                            <div className="mt-6">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Price
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    ref={priceInput}
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1 block w-3/4"
                                    placeholder="price"
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal_u}>取消</SecondaryButton>
                                <BlueButton className="ml-3" disabled={processing}>
                                    更新する
                                </BlueButton>
                            </div>
                        </form>
                    </Modal>

                    <Modal show={confirmingBookDelete} onClose={closeModal_d}>
                        <form onSubmit={deleteBookConfirmed} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                            「タイトル:{bookTitleToDelete}」を本当に削除してもよろしいですか？
                            </h2>
                            {bookToDelete && (
                                <div className="mt-2 text-gray-700">
                                    <p>削除するID: {bookToDelete}</p>
                                </div>

                            )}
                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal_d}>キャンセル</SecondaryButton>
                                <DangerButton className="ml-3" disabled={processing}>
                                    削除する
                                </DangerButton>
                            </div>
                        </form>
                    </Modal>

                    {message && <div className="mt-2 text-blue-900  bg-green-100 p-3 rounded-lg text-center font-bold">{message}</div>}
                    <div>
                        <table className="w-full bg-gray-100 mt-2">
                            <thead className="bg-blue-100">
                                <tr className='text-green-600'>
                                    <th className='px-2 py-2 border border-gray-400'>ID</th>
                                    <th className='px-2 py-2 border border-gray-400'>Title</th>
                                    <th className='px-2 py-2 border border-gray-400'>Content</th>
                                    <th className='px-2 py-2 border border-gray-400'>Category</th>
                                    <th className='px-2 py-2 border border-gray-400'>price</th>
                                    <th className='px-2 py-2 border border-gray-400'></th>
                                    <th className='px-2 py-2 border border-gray-400'></th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {books.map(book => (
                                    <tr key={book.id}>
                                        <td className='border border-gray-400 px-2 py-2 text-center'>{book.id}</td>
                                        <td className='border border-gray-400 px-2 py-2'>{book.title}</td>
                                        <td className='border border-gray-400 px-2 py-2'>{book.content}</td>
                                        <td className='border border-gray-400 px-2 py-2'>{book.category}</td>
                                        <td className='border border-gray-400 px-2 py-2'>¥{formatPrice(book.price)}</td>

                                        <td className='border border-gray-400 px-2 py-2 text-center'>
                                            <GreenButton onClick={() => confirmBookUpdate(book.id, book.title, book.content, book.category, book.price)}>
                                                編集
                                            </GreenButton>
                                        </td>
                                        <td className='border border-gray-400 px-2 py-2 text-center'>
                                            {/* 追加 */}
                                            <DangerButton onClick={() => confirmBookDelete(book.id, book.title)}>
                                                削除
                                            </DangerButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination paginator={booksPaginator} />
                </div>
            </div>

        </AuthenticatedLayout >
    );
}
