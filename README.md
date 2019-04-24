# react-basics
React application  that explaining all basic concepts for a web application

##Concepts to be covered
Markup : * Type of imports or exports
         * Use of setState. Heart of react component
         * Concept of Router
         * Functional rendering
         * Lifecycle of react component

#### General questions
    Question: What is package.json, package-lock.json files?
    Answer: 
    package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

    With package.json you can't control the versions of the nested dependencies. Even if you lock down the versions of your direct dependencies you cannot 100% guarantee that your full dependency tree will be identical every time.

    With package-lock.json, the lock file locks the version of the full dependency tree. This allows you to guarantee your dependency tree for other developers or for releases whilst still allowing testing of new dependency versions (direct or indirect) using your standard package.json.

    Hence, it is not an redundant one instead provides a functionality to install dependency tree under strict environment.