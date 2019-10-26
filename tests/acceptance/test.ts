import { waitForReact } from "testcafe-react-selectors";
import page from "../../pageObject";

fixture("todomvc suite")
  .page("http://192.168.1.110:5000/")
  .beforeEach(async () => {
    await waitForReact();
  });

test("my first test", async t => {
  const textInput = page(t)
    .app()
    .header()
    .textInput();
  const { visibleItemsCount, todoItem } = page(t)
    .app()
    .mainSection()
    .todoList();
  const { activeCount, showCompleted } = page(t)
    .app()
    .mainSection()
    .footer();

  await t.expect(await visibleItemsCount()).eql(1);

  await todoItem("Use Redux").destroy();
  await t.expect(await visibleItemsCount()).eql(0);

  await textInput.enterText("One");
  await textInput.enterText("Two");
  await textInput.enterText("Three");
  await t.expect(await visibleItemsCount()).eql(3);
  await t.expect(await activeCount()).eql(3);

  await todoItem("Two").toggle();
  await t.expect(await visibleItemsCount()).eql(3);
  await t.expect(await activeCount()).eql(2);

  await showCompleted();
  await t.expect(await visibleItemsCount()).eql(1);
  await t.expect(await activeCount()).eql(2);
});
