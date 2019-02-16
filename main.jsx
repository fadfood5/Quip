/**
 * Author: Saikrishna
 * @jsx React.DOM
 */


//Making the main component, InstantBox
var InstantBox = React.createClass({
    doSearch:function(queryText){
        //get query result
        var queryResult=[];
        this.props.data.forEach(function(item){
            if(new RegExp(queryText,"i").test(item.name))
            //if(person.name.toString().toLowerCase().indexOf(queryText)!=-1)
                if(queryResult.length<4)
                    queryResult.push(item);
        });
        this.setState({
            query:queryText,
            filteredData: queryText!=""?queryResult:[]
        })
    },
    getInitialState:function(){
        return{
            query:'',
            color: (function(){
                return ["is-Red","is-Purple","is-DeepPurple","is-Indigo","is-Cyan","is-Blue","is-Teal","is-Green","is-Amber","is-Orange","is-DeepOrange","is-Brown","is-Grey","is-BlueGrey"][parseInt(Math.random()*14)]+" hero is-fullheight";
            })(),
            filteredData: []
        }
    },
    render:function(){
        return (
            <div className="wrap">
                <section className={this.state.color}>
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <img src="./logo.png" />
                            <h1 className="title">
                                Quip
                            </h1>
                            <SearchBox query={this.state.query} doSearch={this.doSearch}/>
                            <div className="InstantBox">
                                <DisplayTable data={this.state.filteredData}/>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="footer">
                    <div class="container">
                        <div class="content has-text-centered">
                            <p>
                                <strong>Quip</strong> by <a href="http://vinnakota.co.in">Saikrishna Vinnakota</a> and&nbsp;
                                <a href="http://fadibitar.me">Fadi Bitar</a>.
                            </p>
                            <p>
                                Notice a missing location? Let us know at <a class="icon"
                                                                             href="mailto:usfquip@gmail.com">usfquip@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
});

var SearchBox = React.createClass({
    componentDidMount(){
        this.refs.searchInput.getDOMNode().focus();
    },
    doSearch:function(){
        var query=this.refs.searchInput.getDOMNode().value; // this is the search text
        this.props.doSearch(query);
    },
    render:function(){
        return <input className="input" type="text" ref="searchInput" placeholder="Search for a Building" value={this.props.query} onChange={(evt) => this.doSearch(evt)}/>
    }
});

var DisplayTable = React.createClass({
    render:function(){
        //making the rows to display
        var rows=[];
        this.props.data.forEach(function(person) {
            rows.push(<li><a href={person.link} target="_blank"> {person.name}</a></li>)
        });
        return(
            <ul>{rows}</ul>
        );
    }
});


React.renderComponent(<InstantBox data={tableData}/>,document.body);
