import { ReactSelector } from "testcafe-react-selectors";

const page = t => ({
  app() {
    const App = ReactSelector("App");
    return {
      header() {
        const Header = App.findReact("Header");
        return {
          textInput() {
            const TodoTextInput = Header.findReact("TodoTextInput");
            return {
              async enterText(text) {
                await t.typeText(TodoTextInput, text).pressKey("enter");
                return this;
              }
            };
          }
        };
      },
      mainSection() {
        const MainSection = App.findReact("MainSection");
        return {
          todoList() {
            const TodoList = MainSection.findReact("TodoList");
            return {
              async visibleItemsCount() {
                return await TodoList.findReact("TodoItem").count;
              },
              todoItem(text) {
                const TodoItem = TodoList.findReact("TodoItem").withProps({
                  todo: { text }
                });
                return {
                  async toggle() {
                    await t.click(TodoItem.find("input.toggle"));
                    return this;
                  },
                  async destroy() {
                    await t
                      .hover(TodoItem)
                      .click(TodoItem.find("button.destroy"));
                    return this;
                  }
                };
              }
            };
          },
          footer() {
            const Footer = MainSection.findReact("Footer");
            return {
              async activeCount() {
                const countStr = await Footer.find(".todo-count strong")
                  .innerText;
                return Number(countStr);
              },
              async showAll() {
                await t.click(
                  Footer.findReact("Link").withProps({ filter: "show_all" })
                );
              },
              async showActive() {
                await t.click(
                  Footer.findReact("Link").withProps({ filter: "show_active" })
                );
              },
              async showCompleted() {
                await t.click(
                  Footer.findReact("Link").withProps({
                    filter: "show_completed"
                  })
                );
              }
            };
          }
        };
      }
    };
  }
});

export default page;
